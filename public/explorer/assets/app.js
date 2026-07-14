(function () {
  "use strict";

  const data = window.SHOWCASE_DATA;
  const state = {
    project: "good_v3",
    layer: "__all__",
    query: "",
    selectedNode: null,
  };

  const els = {
    thesis: document.getElementById("project-thesis"),
    badge: document.getElementById("active-badge"),
    title: document.getElementById("network-title"),
    metrics: document.getElementById("metrics"),
    pipeline: document.getElementById("pipeline"),
    layerFilter: document.getElementById("layer-filter"),
    search: document.getElementById("node-search"),
    svg: document.getElementById("network-svg"),
    nodeTitle: document.getElementById("node-title"),
    nodeDetails: document.getElementById("node-details"),
    edgeList: document.getElementById("edge-list"),
    status: document.getElementById("status-chart"),
    precision: document.getElementById("precision-chart"),
    coverage: document.getElementById("coverage-chart"),
    modules: document.getElementById("study-modules"),
    topNodes: document.getElementById("top-nodes"),
    communities: document.getElementById("communities"),
    topNodeSubtitle: document.getElementById("top-node-subtitle"),
    communitySubtitle: document.getElementById("community-subtitle"),
    portfolio: document.getElementById("portfolio"),
  };

  const typeColors = {
    medication: "#14746f",
    medication_or_pharmacologic_management: "#14746f",
    disease_condition_syndrome: "#be4b3f",
    diagnosis_identification: "#be4b3f",
    diagnostic_result: "#6d5bd0",
    lab_result: "#6d5bd0",
    diagnostic_test: "#0e7490",
    lab_test: "#0e7490",
    imaging_test: "#4d7c0f",
    imaging_selection: "#4d7c0f",
    intervention: "#b45309",
    procedure_or_intervention: "#b45309",
    physical_exam: "#9f4776",
    physical_exam_symptom: "#9f4776",
    etiology_factor: "#a16207",
    answer_target_category: "#334155",
    other_review_required: "#68706a",
  };

  const layerColors = [
    "#14746f",
    "#be4b3f",
    "#6d5bd0",
    "#b45309",
    "#0e7490",
    "#4d7c0f",
    "#9f4776",
    "#a16207",
  ];

  function fmtNumber(value) {
    return Number(value || 0).toLocaleString("en-US");
  }

  function fmtMetric(metric) {
    if (metric.format === "percent") {
      const value = Number(metric.value || 0);
      return `${value.toFixed(value % 1 === 0 ? 0 : 2)}%`;
    }
    return fmtNumber(metric.value);
  }

  function labelize(value) {
    return String(value || "")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function colorForType(type) {
    return typeColors[type] || "#68706a";
  }

  function colorForLayer(layer, layers) {
    const idx = Math.max(0, layers.indexOf(layer));
    return layerColors[idx % layerColors.length];
  }

  function activeProject() {
    return data.projects[state.project];
  }

  function setProject(projectId) {
    state.project = projectId;
    state.layer = "__all__";
    state.query = "";
    state.selectedNode = null;
    els.search.value = "";
    document.querySelectorAll(".project-tab").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.project === projectId);
    });
    render();
  }

  function render() {
    const project = activeProject();
    els.thesis.textContent = project.thesis;
    els.badge.textContent = project.badge;
    els.title.textContent = project.title;
    renderMetrics(project);
    renderPipeline(project);
    renderLayerFilter(project);
    renderNetwork();
    renderV43Panels();
    renderGoodModules();
    renderTopNodes(project);
    renderCommunities(project);
    renderPortfolio();
  }

  function renderMetrics(project) {
    els.metrics.innerHTML = project.metrics
      .map(
        (metric) => `
          <div class="metric">
            <span class="metric-value">${escapeHtml(fmtMetric(metric))}</span>
            <span class="metric-label">${escapeHtml(metric.label)}</span>
          </div>
        `
      )
      .join("");
  }

  function renderPipeline(project) {
    els.pipeline.innerHTML = project.pipeline
      .map((step) => `<li>${escapeHtml(step)}</li>`)
      .join("");
  }

  function renderLayerFilter(project) {
    const options = [
      `<option value="__all__">All layers</option>`,
      ...project.graph.layers.map(
        (layer) =>
          `<option value="${escapeHtml(layer)}"${layer === state.layer ? " selected" : ""}>${escapeHtml(labelize(layer))}</option>`
      ),
    ];
    els.layerFilter.innerHTML = options.join("");
    els.layerFilter.value = state.layer;
  }

  function filteredGraph() {
    const project = activeProject();
    const q = state.query.trim().toLowerCase();
    let edges = project.graph.edges.filter((edge) => state.layer === "__all__" || edge.layer === state.layer);

    if (q) {
      edges = edges.filter((edge) => {
        return (
          edge.sourceLabel.toLowerCase().includes(q) ||
          edge.targetLabel.toLowerCase().includes(q) ||
          labelize(edge.layer).toLowerCase().includes(q)
        );
      });
    }

    edges = edges
      .slice()
      .sort((a, b) => Number(b.weight || 0) - Number(a.weight || 0))
      .slice(0, q ? 260 : 220);

    const nodeIds = new Set();
    edges.forEach((edge) => {
      nodeIds.add(edge.source);
      nodeIds.add(edge.target);
    });

    const nodeMap = new Map(project.graph.nodes.map((node) => [node.id, node]));
    const nodes = Array.from(nodeIds)
      .map((id) => nodeMap.get(id))
      .filter(Boolean);

    return { project, nodes, edges };
  }

  function hash(value) {
    let h = 2166136261;
    const text = String(value);
    for (let i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967295;
  }

  function layoutGraph(nodes, edges, width, height, layers) {
    const safeWidth = Math.max(320, width);
    const safeHeight = Math.max(320, height);
    const centerX = safeWidth / 2;
    const centerY = safeHeight / 2;
    const types = Array.from(new Set(nodes.map((node) => node.type))).sort();
    const radius = Math.max(120, Math.min(safeWidth, safeHeight) * 0.32);
    const centers = new Map();
    types.forEach((type, index) => {
      const angle = types.length === 1 ? 0 : (Math.PI * 2 * index) / types.length - Math.PI / 2;
      centers.set(type, {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius * 0.72,
      });
    });

    const maxWeight = Math.max(...nodes.map((node) => Number(node.weight || 1)), 1);
    const model = nodes.map((node) => {
      const c = centers.get(node.type) || { x: centerX, y: centerY };
      const angle = hash(`${node.id}:angle`) * Math.PI * 2;
      const spread = 32 + hash(`${node.id}:spread`) * 90;
      return {
        ...node,
        x: c.x + Math.cos(angle) * spread,
        y: c.y + Math.sin(angle) * spread,
        vx: 0,
        vy: 0,
        r: 5 + Math.sqrt(Number(node.weight || 1) / maxWeight) * 16,
        fill: colorForType(node.type),
      };
    });

    const byId = new Map(model.map((node) => [node.id, node]));
    const links = edges
      .map((edge) => ({ ...edge, a: byId.get(edge.source), b: byId.get(edge.target) }))
      .filter((edge) => edge.a && edge.b);

    const pairLimit = model.length <= 240 ? model.length : 0;
    for (let step = 0; step < 150; step += 1) {
      for (const node of model) {
        const c = centers.get(node.type) || { x: centerX, y: centerY };
        node.vx += (c.x - node.x) * 0.003;
        node.vy += (c.y - node.y) * 0.003;
      }

      for (const edge of links) {
        const dx = edge.b.x - edge.a.x;
        const dy = edge.b.y - edge.a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const desired = 72 + Math.max(0, 16 - Number(edge.weight || 1));
        const pull = (dist - desired) * 0.006;
        const px = (dx / dist) * pull;
        const py = (dy / dist) * pull;
        edge.a.vx += px;
        edge.a.vy += py;
        edge.b.vx -= px;
        edge.b.vy -= py;
      }

      if (pairLimit) {
        for (let i = 0; i < pairLimit; i += 1) {
          const a = model[i];
          for (let j = i + 1; j < pairLimit; j += 1) {
            const b = model[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distSq = dx * dx + dy * dy + 0.1;
            if (distSq > 9000) {
              continue;
            }
            const dist = Math.sqrt(distSq);
            const push = (58 / distSq) * 1.6;
            const px = (dx / dist) * push;
            const py = (dy / dist) * push;
            a.vx -= px;
            a.vy -= py;
            b.vx += px;
            b.vy += py;
          }
        }
      }

      for (const node of model) {
        node.vx *= 0.78;
        node.vy *= 0.78;
        node.x = Math.min(safeWidth - node.r - 8, Math.max(node.r + 8, node.x + node.vx));
        node.y = Math.min(safeHeight - node.r - 8, Math.max(node.r + 8, node.y + node.vy));
      }
    }

    links.forEach((edge) => {
      edge.color = colorForLayer(edge.layer, layers);
    });
    return { nodes: model, links };
  }

  function renderNetwork() {
    const { project, nodes, edges } = filteredGraph();
    const width = els.svg.clientWidth || els.svg.parentElement.clientWidth || 900;
    const height = els.svg.clientHeight || els.svg.parentElement.clientHeight || 560;
    els.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    els.svg.innerHTML = "";

    if (!nodes.length || !edges.length) {
      els.svg.innerHTML = `<text x="${width / 2}" y="${height / 2}" text-anchor="middle" class="node-label">No matching graph rows</text>`;
      renderNodePanel(null, []);
      return;
    }

    const layout = layoutGraph(nodes, edges, width, height, project.graph.layers);
    const nodeById = new Map(layout.nodes.map((node) => [node.id, node]));
    const selected = state.selectedNode && nodeById.get(state.selectedNode) ? state.selectedNode : layout.nodes[0].id;
    state.selectedNode = selected;

    const edgeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const nodeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const labelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    els.svg.append(edgeGroup, nodeGroup, labelGroup);

    const maxEdge = Math.max(...layout.links.map((edge) => Number(edge.weight || 1)), 1);
    layout.links.forEach((edge) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", edge.a.x);
      line.setAttribute("y1", edge.a.y);
      line.setAttribute("x2", edge.b.x);
      line.setAttribute("y2", edge.b.y);
      line.setAttribute("stroke", edge.color);
      line.setAttribute("stroke-width", String(1 + (Number(edge.weight || 1) / maxEdge) * 4));
      line.setAttribute("class", "edge");
      edgeGroup.appendChild(line);
    });

    layout.nodes.forEach((node) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", node.r);
      circle.setAttribute("fill", node.fill);
      circle.setAttribute("class", `node${node.id === selected ? " is-selected" : ""}`);
      circle.setAttribute("tabindex", "0");
      circle.setAttribute("aria-label", node.label);
      circle.addEventListener("click", () => {
        state.selectedNode = node.id;
        renderNetwork();
      });
      circle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          state.selectedNode = node.id;
          renderNetwork();
        }
      });
      nodeGroup.appendChild(circle);
    });

    const labelNodes = layout.nodes
      .slice()
      .sort((a, b) => Number(b.weight || 0) - Number(a.weight || 0))
      .slice(0, 22);
    labelNodes.forEach((node) => {
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", node.x + node.r + 5);
      label.setAttribute("y", node.y + 4);
      label.setAttribute("class", "node-label");
      label.textContent = node.label.length > 34 ? `${node.label.slice(0, 33)}...` : node.label;
      labelGroup.appendChild(label);
    });

    const selectedNode = nodeById.get(selected);
    const selectedEdges = layout.links
      .filter((edge) => edge.source === selected || edge.target === selected)
      .sort((a, b) => Number(b.weight || 0) - Number(a.weight || 0));
    renderNodePanel(selectedNode, selectedEdges);
  }

  function renderNodePanel(node, edges) {
    if (!node) {
      els.nodeTitle.textContent = "Network Focus";
      els.nodeDetails.innerHTML = "";
      els.edgeList.innerHTML = "";
      return;
    }
    els.nodeTitle.textContent = node.label;
    const detailRows = [
      ["Type", labelize(node.type)],
      ["Weight", fmtNumber(node.weight)],
      ["Degree", fmtNumber(node.degree || node.layerCount || edges.length)],
      ["Community", node.community || "mixed"],
    ];
    els.nodeDetails.innerHTML = detailRows
      .map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`)
      .join("");
    els.edgeList.innerHTML = edges
      .slice(0, 9)
      .map((edge) => {
        const other = edge.source === node.id ? edge.targetLabel : edge.sourceLabel;
        const meta = `${labelize(edge.layer)} | weight ${fmtNumber(edge.weight)}${edge.stability ? ` | stability ${edge.stability}` : ""}`;
        return `
          <div class="edge-item">
            <strong>${escapeHtml(other)}</strong>
            <span>${escapeHtml(meta)}</span>
          </div>
        `;
      })
      .join("");
  }

  function barRow(row, max, valueKey, labelKey, suffix) {
    const value = Number(row[valueKey] || 0);
    const width = max ? Math.max(2, (value / max) * 100) : 0;
    return `
      <div class="bar-row">
        <span>${escapeHtml(row[labelKey])}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
        <span>${escapeHtml(fmtNumber(value))}${suffix || ""}</span>
      </div>
    `;
  }

  function renderV43Panels() {
    const project = data.projects.v43;
    const statusMax = Math.max(...project.status.map((row) => row.count), 1);
    els.status.innerHTML = project.status.map((row) => barRow(row, statusMax, "count", "label", "")).join("");

    const precisionMax = Math.max(...project.precision.map((row) => row.reviewed), 1);
    els.precision.innerHTML = project.precision
      .map((row) => {
        const display = `${fmtNumber(row.reviewed)} / ${row.precision.toFixed(0)}%`;
        const width = Math.max(2, (row.reviewed / precisionMax) * 100);
        return `
          <div class="bar-row">
            <span>${escapeHtml(row.label)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
            <span>${escapeHtml(display)}</span>
          </div>
        `;
      })
      .join("");

    els.coverage.innerHTML = project.coverage
      .map((row) => {
        const width = Math.max(2, Number(row.rate || 0));
        return `
          <div class="coverage-row" title="${escapeHtml(row.source)}">
            <span>${escapeHtml(row.source)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
            <span>${Number(row.rate).toFixed(1)}%</span>
          </div>
        `;
      })
      .join("");
  }

  function renderGoodModules() {
    const modules = data.projects.good_v3.studyModules;
    els.modules.innerHTML = modules
      .slice(0, 8)
      .map(
        (module) => `
          <div class="module-card">
            <h3>${escapeHtml(module.theme)}</h3>
            <p>${escapeHtml(module.tactic)}</p>
            <div class="tag-list">
              ${module.answers
                .concat(module.clues.slice(0, 2))
                .slice(0, 5)
                .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
                .join("")}
            </div>
          </div>
        `
      )
      .join("");
  }

  function renderTopNodes(project) {
    els.topNodeSubtitle.textContent = project.id === "good_v3" ? "weighted degree" : "weighted degree by layer";
    const rows = project.topNodes
      .map(
        (row) => `
          <tr>
            <td>${escapeHtml(row.label)}</td>
            <td>${escapeHtml(row.type)}</td>
            <td>${fmtNumber(row.weight)}</td>
          </tr>
        `
      )
      .join("");
    els.topNodes.innerHTML = `
      <table>
        <thead><tr><th>Node</th><th>Type</th><th>Weight</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderCommunities(project) {
    if (project.id === "good_v3") {
      els.communitySubtitle.textContent = "v3 weighted communities";
      els.communities.innerHTML = project.communities
        .map(
          (item) => `
            <div class="community-item">
              <strong>Community ${escapeHtml(item.id)} | ${fmtNumber(item.weightedDegree)} weighted degree</strong>
              <span>${escapeHtml(item.mix)}</span>
              <span>${escapeHtml(item.topNodes.join(" | "))}</span>
            </div>
          `
        )
        .join("");
      return;
    }
    els.communitySubtitle.textContent = "v4.3 network communities";
    els.communities.innerHTML = project.communities
      .map(
        (item) => `
          <div class="community-item">
            <strong>${escapeHtml(item.label)} | ${fmtNumber(item.support)} edge support</strong>
            <span>${escapeHtml(labelize(item.layer))}</span>
          </div>
        `
      )
      .join("");
  }

  function renderPortfolio() {
    els.portfolio.innerHTML = data.portfolio
      .map(
        (item) => `
          <div class="portfolio-card">
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.signal)}</p>
            <div class="tag-list"><span class="tag">${escapeHtml(item.visual)}</span></div>
          </div>
        `
      )
      .join("");
  }

  function debounce(fn, wait) {
    let timer = null;
    return function debounced() {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  }

  document.querySelectorAll(".project-tab").forEach((button) => {
    button.addEventListener("click", () => setProject(button.dataset.project));
  });

  els.layerFilter.addEventListener("change", () => {
    state.layer = els.layerFilter.value;
    state.selectedNode = null;
    renderNetwork();
  });

  els.search.addEventListener("input", () => {
    state.query = els.search.value;
    state.selectedNode = null;
    renderNetwork();
  });

  window.addEventListener("resize", debounce(renderNetwork, 150));

  render();
})();

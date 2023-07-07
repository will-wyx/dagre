<script>
  import {onMount} from "svelte";
  import {Graph} from "@antv/x6";
  import graphData from "../data/graphData.js";
  import dagre from 'dagre';


  let container;
  let x6Graph;

  function createX6Graph(data) {
    x6Graph = new Graph({
      container,
      width: 1200,
      height: 800,
      background: {color: '#efefef'},
    });

    x6Graph.fromJSON(data);
    x6Graph.centerContent();
  }

  onMount(() => {
    const g = new dagre.graphlib.Graph({compound: true})
      .setGraph({
        rankdir: 'LR',
      })
      .setDefaultEdgeLabel(() => ({}));

    graphData.nodes.forEach(node => {
      const {id, label, width, height} = node;
      g.setNode(id, {id, label, width, height});
    });

    graphData.edges.forEach(edge => {
      const {source, target} = edge;
      g.setEdge(source, target);
    });

    dagre.layout(g);

    const layoutNodes = g.nodes(), layoutEdges = g.edges();
    const nodes = layoutNodes.map(v => {
      const node = g.node(v);
      const {id, label, width, height} = node;
      const x = node.x - width / 2;
      const y = node.y - height / 2;
      return {id, label, x, y, width, height};
    });

    const edges = layoutEdges.map(e => {
      const edge = g.edge(e);
      const source = edge.points.shift();
      const target = edge.points.pop();
      const vertices = edge.points;
      return {source, target, vertices};
    });

    createX6Graph({nodes, edges});
  });
</script>
<div bind:this={container} class="container">

</div>
<style>
    .container {

    }
</style>

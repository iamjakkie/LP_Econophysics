const dataset = [
    {timestamp: 1693440000, price: 6.59447269478455e-9},
    {timestamp: 1693353600, price: 3.16103729951614e-9},
    {timestamp: 1693267200, price: 1.16276911880562e-9}
];

const initCards = () => {
  for (let i=1; i<=60; i++){
    let item = document.createElement("div");
    item.classList.add("item");
    item.classList.add("with-background");
    item.innerHTML = `<div class="grid"><div class="chart"></div></div>`; // TODO: rather construct element programatically
    document.querySelector(".container").appendChild(item);
  }
}

const initCharts = () => {
  dataset.forEach(function(d) {
    d.timestamp = new Date(d.timestamp * 1000);
  });

  const itemDivs = document.querySelectorAll(".item");
  itemDivs.forEach(function(itemDiv, index) {
    createChart(dataset, itemDiv);
  });

}

function scrollTrigger(){
  items.forEach((item) => {
    if (item.offsetTop <= window.scrollY+10){
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Chart setup
function createChart(data, container) {
  const margin = {top: 15, right: 5, bottom: 30, left: 40};
  const width = 310 - margin.left - margin.right;
  const height = 220 - margin.top - margin.bottom;
  console.log(container)
  const svg = d3.select(container)
    .select(".chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create x and y scales
  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, function(d) { return d.timestamp; }))
    .range([0, width]);

  const yScale = d3.scaleLog()
    .domain([d3.min(dataset, function(d) { return d.price; }),
            d3.max(dataset, function(d) { return d.price; })])
    .range([height, 0]);

  // Create line generator
  const line = d3.line()
    .x(function(d) { return xScale(d.timestamp); })
    .y(function(d) { return yScale(d.price); });

  // Append line path to the SVG
  svg.append("path")
    .datum(dataset)
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "#0f6be9")

  // Add x-axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
      .style("font-family", "monospace")
      .style("font-size", "0.65em")
      .style("font-weight", "200")
      .style("opacity", "0.5")
      .call(d3.axisBottom(xScale));

  // Add y-axis with scientific notation
  svg.append("g")
    .attr("class", "y-axis")
      .style("font-family", "monospace")
      .style("font-size", "0.65em")
      .style("font-weight", "200")
      .style("opacity", "0.5")
    .call(d3.axisLeft(yScale).tickFormat(d3.format(".1e"))); // Use scientific notation format
  }
  

const init = () => {
  initCards();
  initCharts();
}

init();
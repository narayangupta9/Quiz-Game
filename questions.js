/**
 * questions.js — DevQuiz question bank
 *
 * Each question object has:
 *   category   : "js" | "dsa" | "da"
 *   label      : display name for the category tag
 *   text       : question text (plain string)
 *   code       : optional HTML string with syntax-highlight spans
 *   options    : array of 4 answer strings
 *   answer     : zero-based index of the correct option
 *   explanation: HTML string shown after answering
 */

const questions = [

  /* ================================================================
     JavaScript  (5 questions)
     ================================================================ */
  {
    category: "js",
    label: "JavaScript",
    text: "What does the following code output?",
    code:
`<span class="kw">const</span> x = <span class="kw">typeof</span> <span class="kw">null</span>;
console.<span class="fn">log</span>(x);`,
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    answer: 2,
    explanation:
      `<strong>typeof null === "object"</strong> is a famous JS bug that has existed
       since the very first version of JavaScript. <code>null</code> is its own
       primitive type, but the runtime tag for objects was 0 — and <code>null</code>
       was represented as a null pointer (0x00), so the type check returned "object".`
  },

  {
    category: "js",
    label: "JavaScript",
    text: "Which statement best describes a JavaScript closure?",
    code: null,
    options: [
      "A function that runs immediately on declaration",
      "A function that retains access to its outer scope after that scope has returned",
      "A method attached to a class prototype",
      "An arrow function without an explicit return"
    ],
    answer: 1,
    explanation:
      `A <strong>closure</strong> is formed when a function "remembers" the lexical
       environment (variables) of its enclosing scope even after that scope has finished
       executing. This enables data privacy, factory functions, and memoization patterns.`
  },

  {
    category: "js",
    label: "JavaScript",
    text: "What is the output of this snippet?",
    code:
`<span class="fn">console</span>.<span class="fn">log</span>(<span class="num">1</span>);
<span class="fn">setTimeout</span>(() <span class="op">=></span> <span class="fn">console</span>.<span class="fn">log</span>(<span class="num">2</span>), <span class="num">0</span>);
<span class="kw">Promise</span>.<span class="fn">resolve</span>().<span class="fn">then</span>(() <span class="op">=></span> <span class="fn">console</span>.<span class="fn">log</span>(<span class="num">3</span>));
<span class="fn">console</span>.<span class="fn">log</span>(<span class="num">4</span>);`,
    options: ["1 2 3 4", "1 4 2 3", "1 4 3 2", "4 3 2 1"],
    answer: 2,
    explanation:
      `<strong>Event loop order:</strong> Synchronous code runs first (1, 4), then
       microtasks like Promises (3), then macrotasks like setTimeout (2).
       Final output: 1 → 4 → 3 → 2.`
  },

  {
    category: "js",
    label: "JavaScript",
    text: "What will arr.flat(Infinity) return?",
    code:
`<span class="kw">const</span> arr = [<span class="num">1</span>, [<span class="num">2</span>, [<span class="num">3</span>, [<span class="num">4</span>]]]];
arr.<span class="fn">flat</span>(<span class="num">Infinity</span>);`,
    options: [
      "[1, [2, [3, [4]]]]",
      "[1, 2, [3, [4]]]",
      "[1, 2, 3, 4]",
      "Throws a TypeError"
    ],
    answer: 2,
    explanation:
      `<strong>Array.flat(depth)</strong> flattens nested arrays up to the given depth.
       Passing <code>Infinity</code> flattens all levels regardless of nesting depth,
       producing a completely flat array.`
  },

  {
    category: "js",
    label: "JavaScript",
    text: "What happens when Array.prototype.reduce() is called with no initial value?",
    code: null,
    options: [
      "Always returns undefined",
      "Uses arr[0] as accumulator, starts iterating from index 1",
      "Always throws a TypeError",
      "Uses 0 as the default accumulator"
    ],
    answer: 1,
    explanation:
      `When no <strong>initial value</strong> is provided, <code>reduce()</code> uses
       the first element as the accumulator and starts the callback from index 1.
       It only throws a TypeError if the array is also empty.`
  },

  /* ================================================================
     Data Structures & Algorithms  (5 questions)
     ================================================================ */
  {
    category: "dsa",
    label: "DSA",
    text: "What is the worst-case time complexity of QuickSort?",
    code: null,
    options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
    answer: 1,
    explanation:
      `<strong>QuickSort's worst case is O(n²)</strong> — this occurs when the pivot is
       always the smallest or largest element (e.g. an already-sorted array with a naive
       first-element pivot). Average and best case are O(n log n). Most implementations
       use randomised or median-of-three pivots to avoid the worst case.`
  },

  {
    category: "dsa",
    label: "DSA",
    text: "Which data structure provides O(1) average time for lookup, insert, and delete?",
    code: null,
    options: ["Binary Search Tree", "Doubly Linked List", "Hash Table", "Min-Heap"],
    answer: 2,
    explanation:
      `<strong>Hash Tables</strong> compute an index directly from the key, giving O(1)
       average time for all three operations. Worst case degrades to O(n) due to hash
       collisions, but a good hash function and load-factor management keeps this rare.`
  },

  {
    category: "dsa",
    label: "DSA",
    text: "Which tree traversal visits nodes in the order: root → left subtree → right subtree?",
    code: null,
    options: ["In-order", "Post-order", "Pre-order", "Level-order"],
    answer: 2,
    explanation:
      `<strong>Pre-order</strong> traversal: visit root first, then recurse left, then right.
       In-order (L → Root → R) yields sorted output from a BST.
       Post-order (L → R → Root) is used when deleting trees.
       Level-order uses a queue (BFS).`
  },

  {
    category: "dsa",
    label: "DSA",
    text: "On a sorted array of 1,000,000 elements, binary search makes at most how many comparisons?",
    code: null,
    options: ["~500 000", "~1 000", "~20", "~100 000"],
    answer: 2,
    explanation:
      `<strong>Binary search is O(log n).</strong> log₂(1,000,000) ≈ 19.9, so at most
       20 comparisons. Each step halves the search space — exponentially faster than the
       ~500,000 comparisons linear search would need on average.`
  },

  {
    category: "dsa",
    label: "DSA",
    text: "Which algorithm guarantees the shortest path (fewest edges) in an unweighted graph?",
    code: null,
    options: ["Dijkstra's", "BFS", "DFS", "Bellman-Ford"],
    answer: 1,
    explanation:
      `<strong>BFS (Breadth-First Search)</strong> explores nodes level by level, so the
       first time it reaches a node it has taken the fewest possible edges.
       Dijkstra's handles weighted graphs; DFS does not guarantee shortest paths;
       Bellman-Ford handles negative weights.`
  },

  /* ================================================================
     Data Analytics  (5 questions)
     ================================================================ */
  {
    category: "da",
    label: "Analytics",
    text: "Which SQL clause is used to filter results after a GROUP BY aggregation?",
    code: null,
    options: ["WHERE", "FILTER", "HAVING", "AND"],
    answer: 2,
    explanation:
      `<strong>HAVING</strong> filters rows after aggregation
       (e.g. <code>HAVING COUNT(*) > 5</code>).
       WHERE filters individual rows before aggregation.
       Placing aggregate conditions in WHERE raises a syntax error.`
  },

  {
    category: "da",
    label: "Analytics",
    text: "In a normal distribution, roughly what percentage of values fall within ±1 standard deviation of the mean?",
    code: null,
    options: ["50%", "68%", "95%", "99.7%"],
    answer: 1,
    explanation:
      `The <strong>68-95-99.7 (empirical) rule:</strong> ~68% of data falls within ±1σ,
       ~95% within ±2σ, and ~99.7% within ±3σ.
       This is fundamental to statistical testing and anomaly detection.`
  },

  {
    category: "da",
    label: "Analytics",
    text: "What does the following pandas expression return?",
    code:
`df.<span class="fn">groupby</span>(<span class="str">'city'</span>).<span class="fn">agg</span>({<span class="str">'revenue'</span>: <span class="str">'sum'</span>})`,
    options: [
      "A DataFrame sorted alphabetically by city",
      "Total revenue summed for each unique city",
      "Rows where city is not null",
      "Mean revenue per city"
    ],
    answer: 1,
    explanation:
      `<strong>groupby + agg</strong> splits the DataFrame by unique values of "city",
       then applies the aggregation function (<code>sum</code>) to the "revenue" column
       for each group. The result is a DataFrame indexed by city with summed revenue.`
  },

  {
    category: "da",
    label: "Analytics",
    text: "What does a Pearson correlation coefficient of −0.95 indicate?",
    code: null,
    options: [
      "Very weak negative relationship",
      "No relationship between the variables",
      "Strong positive linear relationship",
      "Strong negative linear relationship"
    ],
    answer: 3,
    explanation:
      `<strong>Pearson r</strong> ranges from −1 to +1.
       A value of −0.95 signals a very strong negative linear relationship —
       as one variable increases, the other decreases almost proportionally.
       Values near 0 indicate little or no linear correlation.`
  },

  {
    category: "da",
    label: "Analytics",
    text: "Which chart type is best suited for visualising the distribution of a continuous variable?",
    code: null,
    options: ["Pie chart", "Bar chart", "Histogram", "Line chart"],
    answer: 2,
    explanation:
      `A <strong>histogram</strong> bins continuous data into intervals and shows the
       frequency per bin, making the shape of the distribution (normal, skewed, bimodal)
       immediately visible. Bar charts are for categorical data;
       line charts show trends over time.`
  }

];

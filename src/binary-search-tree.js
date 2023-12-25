const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}
  root() {
		return this.rootNode;
  }
  add(data) {
    this.rootNode = addNode(this.rootNode, data);

		function addNode(node, value) {
			if(!node) return new Node(value);
			if(node.data === value) return node;
			if (value < node.data) {
				node.left = addNode(node.left, value)
			} else {
				node.right = addNode(node.right, value);
			}
			return node;
		}
  }
  has(data) {
    return this.#search(this.rootNode, data);
  }
  find(data) {
		return this.#search(this.rootNode, data, true);
  }
  remove(data) {
    this.rootNode = remover(this.rootNode, data);
		function remover(node, value) {
			if(!node || (!node.left && !node.right)) return null;
			if(value < node.data) {
				node.left = remover(node.left, value);
			} else if(value > node.data) {
				node.right = remover(node.right, value);
				}
				else if(!node.left) {
					node = node.right;
				}
				else if(!node.right) {
					node = node.left;
				}
				else {
					let minRight = node.right;
					while(minRight.left) {
						minRight = minRight.left;
					}
					node.data = minRight.data;
					node.right = remover(node.right, minRight.data);
				}
				return node;
		}
	}
  min() {
    return this.#runner('left');
  }
  max() {
		return this.#runner('right');
  }
	#runner(direction) {
		let node = this.rootNode;
		if(!node) return null;
		while(node[direction]) {
			node = node[direction];
		}
		return node.data;
	}
	#search(node, value, option = false) {
		if(!node) return option? null : false;
		if(node.data === value) {
			return option? node : true;
		}
		return value < node.data? this.#search(node.left, value, option) : this.#search(node.right, value, option);
	}
}

module.exports = {
  BinarySearchTree
};
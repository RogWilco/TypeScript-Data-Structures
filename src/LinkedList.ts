/**
 * Represents the data structure commonly known as a linked list.
 */
export default class LinkedList<T> {
  head: Node<T> | null = null

  /**
   * Initializes a new linked list.
   *
   * @param nodes zero or more nodes with which to initialize the list
   */
  constructor (...nodes: Node<T>[]) {
    if (nodes.length) {
      this.setHead(nodes[0])

      for (let i = 1; i < nodes.length && this.head; i++) {
        this.insertAfter(nodes[i - 1], nodes[i])
      }
    }
  }

  /**
   * Generates a string representation of the linked list.
   *
   * Time:  O(N)
   * Space: O(N)
   *
   * @return the generated string
   */
  toString () {
    let result = []
    let node = this.head

    while (node) {
      result.push(node.value)
      node = node.next
    }

    return result.join(' -> ')
  }

  /**
   * Sets the provided node as the head node of the list. Existing nodes will be
   * moved from their current position before becoming the head node.
   *
   * Time:  O(1)
   * Space: O(1)
   *
   * @param node the node to be set as the head
   */
  setHead (node: Node<T>) {
    if (this.head === null) {
      this.head = node
      return
    }

    // If the node is already in the list, remove it.
    this.remove(node)

    // Update node references.
    node.next = this.head
    this.head = node
  }

  /**
   * Inserts a new node after the specified existing node. If the inserted node
   * is already in the list, it will be moved.
   *
   * Time:  O(1)
   * Space: O(1)
   *
   * @param existingNode the existing node after which to insert
   * @param nodeToInsert the new node to be inserted (or moved)
   */
  insertAfter (existingNode: Node<T>, nodeToInsert: Node<T>) {
    // If we're assigning the same node before itself, do nothing.
    if (existingNode === nodeToInsert) {
      return
    }

    // If the node is already in the list, remove it.
    this.remove(nodeToInsert)

    // Update the node's references.
    nodeToInsert.next = existingNode.next
    existingNode.next = nodeToInsert
  }

  /**
   * Inserts a new node at the specified position. If the inserted node is
   * already in the list, it will be moved.
   *
   * Time:  O(position) => O(N)
   * Space: O(1)
   *
   * @param position the list position (head starts at 1)
   * @param nodeToInsert the node to be inserted (or moved)
   */
  insertAtPosition (position: number, nodeToInsert: Node<T>) {
    // If the node is already in the list, remove it first.
    this.remove(nodeToInsert)

    // Get prevous node to node at position.
    let currentNode = this.head
    let previousNode = null
    let i = 1

    while (i < position) {
      previousNode = currentNode
      // @ts-ignore
      currentNode = currentNode.next
      i++

      if (currentNode === null && position > i) {
        throw new Error(
          `The position ${position} extends beyond the end of the list (which is currently ${i}).`
        )
      }
    }

    if (previousNode === null) {
      return this.setHead(nodeToInsert)
    }

    return this.insertAfter(previousNode, nodeToInsert)
  }

  /**
   * Removes the specified node from the list.
   *
   * Time:  O(1)
   * Space: O(1)
   *
   * @param node the node to be removed
   */
  remove (node: Node<T>) {
    let currentNode = this.head
    let previousNode = null

    while (currentNode) {
      if (currentNode === node) {
        if (previousNode) {
          previousNode.next = currentNode.next
        } else {
          this.head = currentNode.next
        }
        break
      }

      previousNode = currentNode
      currentNode = currentNode.next
    }

    node.next = null
  }

  /**
   * Removes all nodes with the specified value from the list.
   *
   * Time:  O(N)
   * Space: O(1)
   *
   * @param value the target value
   */
  removeNodesWithValue (value: T) {
    let node = this.head

    while (node) {
      let nextNode = node.next

      if (node.value === value) {
        this.remove(node)
      }

      node = nextNode
    }
  }

  /**
   * Whether or not one or more nodes in the list have the given value.
   *
   * Time:  O(N)
   * Space: O(1)
   *
   * @param value the target value
   */
  containsNodeWithValue (value: T) {
    let node = this.head

    while (node) {
      if (node.value === value) {
        return true
      }

      node = node.next
    }

    return false
  }
}

/**
 * Represents a node within a linked list.
 */
export class Node<T> {
  value: T
  next: Node<T> | null

  /**
   * Initializes a new node.
   *
   * @param value the value to be associated with the node
   * @param next a reference to the following node
   */
  constructor (value: T, next: Node<T> | null = null) {
    this.value = value
    this.next = next
  }
}

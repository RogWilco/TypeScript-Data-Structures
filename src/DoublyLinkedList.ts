/**
 * Represents the data structure commonly known as a doubly-linked list.
 */
export default class DoublyLinkedList<T> {
  head: Node<T> | null = null
  tail: Node<T> | null = null

  /**
   * Initializes a new doubly-linked list.
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
   * Generates a string representation of the doubly linked list.
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

    return result.join(' <-> ')
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
      this.tail = node
      return
    }

    this.insertBefore(this.head, node)
  }

  /**
   * Sets the provided node as the tail node of the list. Existing nodes will be
   * moved from their current position before becoming the tail node.
   *
   * Time:  O(1)
   * Space: O(1)
   *
   * @param node the node to be set as the tail
   */
  setTail (node: Node<T>) {
    if (this.tail === null) {
      this.setHead(node)
      return
    }

    this.insertAfter(this.tail, node)
  }

  /**
   * Inserts a new node before the specified existing node. If the inserted node
   * is already in the list, it will be moved.
   *
   * Time:  O(1)
   * Space: O(1)
   *
   * @param existingNode the existing node before which to insert
   * @param nodeToInsert the new node to be inserted (or moved)
   */
  insertBefore (existingNode: Node<T>, nodeToInsert: Node<T>) {
    // If we're assigning the same node before itself, do nothing.
    if (existingNode === nodeToInsert) {
      return
    }

    // If the node is already in the list, remove it.
    this.remove(nodeToInsert)

    // Update the node's references.
    nodeToInsert.next = existingNode
    nodeToInsert.prev = existingNode.prev

    if (nodeToInsert.prev) {
      nodeToInsert.prev.next = nodeToInsert
    } else {
      this.head = nodeToInsert
    }

    existingNode.prev = nodeToInsert
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
    nodeToInsert.prev = existingNode
    nodeToInsert.next = existingNode.next

    if (nodeToInsert.next) {
      nodeToInsert.next.prev = nodeToInsert
    } else {
      this.tail = nodeToInsert
    }

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

    // Get node at position $position
    let node = this.head
    let i = 1

    while (i < position) {
      // @ts-ignore
      node = node.next
      i++

      if (node === null && position > i) {
        throw new Error(
          `The position ${position} extends beyond the end of the list (which is currently ${i}).`
        )
      }
    }

    if (node === null) {
      return this.setTail(nodeToInsert)
    }

    // @ts-ignore
    return this.insertBefore(node, nodeToInsert)
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
    // If the node isn't already in the list, return.
    if (node !== this.head && node.next === null && node.prev === null) {
      return
    }

    if (node.next) {
      node.next.prev = node.prev
    } else {
      this.tail = node.prev
    }

    if (node.prev) {
      node.prev.next = node.next
    } else {
      this.head = node.next
    }

    node.next = null
    node.prev = null
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
 * Represents a node within a doubly-linked list.
 */
export class Node<T> {
  value: T
  prev: Node<T> | null
  next: Node<T> | null

  /**
   * Initializes a new node.
   *
   * @param value the value to be associated with the node
   * @param prev a reference to the preceding node
   * @param next a reference to the following node
   */
  constructor (
    value: T,
    prev: Node<T> | null = null,
    next: Node<T> | null = null
  ) {
    this.value = value
    this.prev = prev
    this.next = next
  }
}

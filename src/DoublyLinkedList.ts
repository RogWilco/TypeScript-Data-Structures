/**
 * Represents the data structure commonly known as a doubly-linked list.
 */
export default class DoublyLinkedList {
  head: Node | null = null
  tail: Node | null = null

  /**
   * Initializes a new doubly-linked list.
   *
   * @param nodes zero or more nodes with which to initialize the list
   */
  constructor (...nodes: Node[]) {
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
   * @param node the node to be set as the head
   */
  setHead (node: Node) {
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
   * @param node the node to be set as the tail
   */
  setTail (node: Node) {
    if (this.tail === null) {
      this.head = node
      this.tail = node
      return
    }

    this.insertAfter(this.tail, node)
  }

  /**
   * Inserts a new node before the specified existing node. If the inserted node
   * is already in the list, it will be moved.
   *
   * @param existingNode the existing node before which to insert
   * @param nodeToInsert the new node to be inserted (or moved)
   */
  insertBefore (existingNode: Node, nodeToInsert: Node) {
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
   * @param existingNode the existing node after which to insert
   * @param nodeToInsert the new node to be inserted (or moved)
   */
  insertAfter (existingNode: Node, nodeToInsert: Node) {
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
   * Inserts a new node at the specified position. If the in serted node is
   * already in the list, it will be moved.
   *
   * @param position the list position (head starts at 1)
   * @param nodeToInsert the node to be inserted (or moved)
   */
  insertAtPosition (position: number, nodeToInsert: Node) {
    // If the node is already in the list, remove it first.
    this.remove(nodeToInsert)

    // Get node at position $position
    let node = this.head
    let i = 1

    while (i < position) {
      // @ts-ignore
      node = node.next
      i++

      if (node === null) {
        break
      }

      // if (node === null && position > i) {
      //   throw new Error(
      //     `The position ${position} extends beyond the end of the list (which is currently ${i}).`
      //   )
      // }
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
   * @param node the node to be removed
   */
  remove (node: Node) {
    // If the node isn't already in the list, return.
    if (node.next === null && node.prev === null) {
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
   * @param value the target value
   */
  removeNodesWithValue (value: any) {
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
   * Whether or not one or more nodes in the list contain the given value.
   *
   * @param value the target value
   */
  containsNodeWithValue (value: any) {
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
export class Node {
  value: any
  prev: Node | null
  next: Node | null

  /**
   * Initializes a new node.
   *
   * @param value the value to be associated with the node
   * @param prev a reference to the preceding node
   * @param next a reference to the following node
   */
  constructor (value: any, prev = null, next = null) {
    this.value = value
    this.prev = prev
    this.next = next
  }
}
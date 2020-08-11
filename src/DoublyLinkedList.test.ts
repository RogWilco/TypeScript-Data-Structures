import DoublyLinkedList, { Node } from 'DoublyLinkedList'

describe('DoublyLinkedList', () => {
  let foo: Node<string>,
    bar: Node<string>,
    baz: Node<string>,
    qux: Node<string>,
    quux: Node<string>

  beforeEach(() => {
    ;[foo, bar, baz, qux, quux] = [
      new Node('foo'),
      new Node('bar'),
      new Node('baz'),
      new Node('qux'),
      new Node('quux')
    ]
  })

  describe('toString()', () => {
    test('generates an empty string for an empty list', () => {
      const list = new DoublyLinkedList()

      expect(list.toString()).toBe('')
    })

    test('generates the expected string for a single node list', () => {
      const list = new DoublyLinkedList(foo)

      expect(list.toString()).toBe('foo')
    })

    test('generates the expected string for a multiple node list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      expect(list.toString()).toBe('foo <-> bar <-> baz')
    })
  })

  describe('setHead()', () => {
    test('adds a node to the head of an empty list', () => {
      const list = new DoublyLinkedList()

      list.setHead(foo)

      expect(list.toString()).toBe('foo')
      expect(list.head?.value).toBe('foo')
      expect(list.tail?.value).toBe('foo')
    })

    test('adds a node to the head of a single-node list', () => {
      const list = new DoublyLinkedList(foo)

      list.setHead(bar)

      expect(list.toString()).toBe('bar <-> foo')
      expect(list.head?.value).toBe('bar')
      expect(list.tail?.value).toBe('foo')
    })

    test('adds a node to the head of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar)

      list.setHead(baz)

      expect(list.toString()).toBe('baz <-> foo <-> bar')
      expect(list.head?.value).toBe('baz')
      expect(list.tail?.value).toBe('bar')
    })
  })

  describe('setTail()', () => {
    test('adds a node to the tail of an empty list', () => {
      const list = new DoublyLinkedList()

      list.setTail(foo)

      expect(list.toString()).toBe('foo')
      expect(list.head?.value).toBe('foo')
      expect(list.tail?.value).toBe('foo')
    })

    test('adds a node to the tail of a single-node list', () => {
      const list = new DoublyLinkedList(foo)

      list.setTail(bar)

      expect(list.toString()).toBe('foo <-> bar')
      expect(list.head?.value).toBe('foo')
      expect(list.tail?.value).toBe('bar')
    })

    test('adds a node to the tail of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar)

      list.setTail(baz)

      expect(list.toString()).toBe('foo <-> bar <-> baz')
      expect(list.head?.value).toBe('foo')
      expect(list.tail?.value).toBe('baz')
    })
  })

  describe('insertBefore()', () => {
    test('inserts a new node at the head of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      list.insertBefore(foo, qux)

      expect(list.toString()).toBe('qux <-> foo <-> bar <-> baz')
      expect(list.head?.value).toBe('qux')
    })

    test('inserts a new node in the middle of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      list.insertBefore(bar, qux)

      expect(list.toString()).toBe('foo <-> qux <-> bar <-> baz')
    })

    test('inserts an existing node at the head of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      expect(list.toString()).toBe('foo <-> bar <-> baz <-> qux')

      list.insertBefore(foo, baz)

      expect(list.toString()).toBe('baz <-> foo <-> bar <-> qux')
      expect(list.head?.value).toBe('baz')
    })

    test('inserts an existing node in the middle of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      expect(list.toString()).toBe('foo <-> bar <-> baz <-> qux')

      list.insertBefore(baz, qux)

      expect(list.toString()).toBe('foo <-> bar <-> qux <-> baz')
    })

    test('does nothing when an existing node is inserted before itself', () => {
      const list = new DoublyLinkedList(foo, bar, baz)
      const listBefore = list.toString()

      list.insertBefore(bar, bar)

      const listAfter = list.toString()

      expect(listBefore).toBe(listAfter)
    })
  })

  describe('insertAfter()', () => {
    test('inserts a new node at the tail of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      list.insertAfter(baz, qux)

      expect(list.toString()).toBe('foo <-> bar <-> baz <-> qux')
      expect(list.tail?.value).toBe('qux')
    })

    test('inserts a new node in the middle of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      list.insertAfter(bar, qux)

      expect(list.toString()).toBe('foo <-> bar <-> qux <-> baz')
    })

    test('inserts an existing node at the tail of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      expect(list.toString()).toBe('foo <-> bar <-> baz <-> qux')

      list.insertAfter(qux, bar)

      expect(list.toString()).toBe('foo <-> baz <-> qux <-> bar')
      expect(list.tail?.value).toBe('bar')
    })

    test('inserts an existing node in the middle of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      expect(list.toString()).toBe('foo <-> bar <-> baz <-> qux')

      list.insertAfter(bar, qux)

      expect(list.toString()).toBe('foo <-> bar <-> qux <-> baz')
    })

    test('does nothing when an existing node is inserted after itself', () => {
      const list = new DoublyLinkedList(foo, bar, baz)
      const listBefore = list.toString()

      list.insertAfter(bar, bar)

      const listAfter = list.toString()

      expect(listBefore).toBe(listAfter)
    })
  })

  describe('insertAtPosition()', () => {
    test('inserts a new node at the head of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.insertAtPosition(1, quux)

      expect(list.toString()).toBe('quux <-> foo <-> bar <-> baz <-> qux')
      expect(list.head?.value).toBe('quux')
    })

    test('inserts a new node at the tail of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.insertAtPosition(5, quux)

      expect(list.toString()).toBe('foo <-> bar <-> baz <-> qux <-> quux')
      expect(list.tail?.value).toBe('quux')
    })

    test('inserts a new node in the middle of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.insertAtPosition(3, quux)

      expect(list.toString()).toBe('foo <-> bar <-> quux <-> baz <-> qux')
    })

    test('inserts an existing node at the head of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.insertAtPosition(1, baz)

      expect(list.toString()).toBe('baz <-> foo <-> bar <-> qux')
      expect(list.head?.value).toBe('baz')
    })

    test('inserts an existing node at the tail of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.insertAtPosition(4, bar)

      expect(list.toString()).toBe('foo <-> baz <-> qux <-> bar')
      expect(list.tail?.value).toBe('bar')
    })

    test('inserts an existing node in the middle of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.insertAtPosition(2, baz)

      expect(list.toString()).toBe('foo <-> baz <-> bar <-> qux')
    })

    test('throws an error when inserting a node beyond the end of a list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      expect(() => {
        list.insertAtPosition(99, qux)
      }).toThrow(Error)
    })
  })

  describe('remove()', () => {
    test('removes an existing node from the head of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      list.remove(foo)

      expect(list.toString()).toBe('bar <-> baz')
      expect(list.head?.value).toBe('bar')
    })

    test('removes an existing node from the tail of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      list.remove(baz)

      expect(list.toString()).toBe('foo <-> bar')
      expect(list.tail?.value).toBe('bar')
    })

    test('removes an existing node from the middle of a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)

      list.remove(bar)

      expect(list.toString()).toBe('foo <-> baz')
    })
  })

  describe('removeNodesWithValue()', () => {
    test('removes a matching head node from a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.removeNodesWithValue('foo')

      expect(list.toString()).toBe('bar <-> baz <-> qux')
      expect(list.head?.value).not.toBe('foo')
    })

    test('removes a matching tail node from a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.removeNodesWithValue('qux')

      expect(list.toString()).toBe('foo <-> bar <-> baz')
      expect(list.tail?.value).not.toBe('qux')
    })

    test('removes a matching node from a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      list.removeNodesWithValue('bar')

      expect(list.toString()).toBe('foo <-> baz <-> qux')
    })

    test('removes 3 matching nodes from a populated list', () => {
      const bar2 = new Node('bar')
      const bar3 = new Node('bar')
      const list = new DoublyLinkedList(foo, bar, bar2, bar2, baz, qux)

      list.removeNodesWithValue('bar')

      expect(list.toString()).toBe('foo <-> baz <-> qux')
    })

    test('removes no matching nodes from a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz)
      const listBefore = list.toString()

      list.removeNodesWithValue('qux')

      const listAfter = list.toString()

      expect(listBefore).toBe(listAfter)
    })

    test('does nothing on an empty list', () => {
      const list = new DoublyLinkedList()

      list.removeNodesWithValue('foo')

      expect(list.toString()).toBe('')
    })
  })

  describe('containsNodeWithValue()', () => {
    test('TRUE when a matching node is the only node in the list', () => {
      const list = new DoublyLinkedList(foo)

      let result = list.containsNodeWithValue('foo')

      expect(result).toBe(true)
    })

    test('TRUE when 1 matching node is in a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, baz, qux)

      let result = list.containsNodeWithValue('bar')

      expect(result).toBe(true)
    })

    test('TRUE when 3 matching nodes are in a populated list', () => {
      const bar2 = new Node('bar')
      const bar3 = new Node('bar')
      const list = new DoublyLinkedList(foo, bar, bar2, bar3, baz, qux)

      let result = list.containsNodeWithValue('bar')

      expect(result).toBe(true)
    })

    test('FALSE when no matching nodes are in a populated list', () => {
      const list = new DoublyLinkedList(foo, bar, qux)

      let result = list.containsNodeWithValue('baz')

      expect(result).toBe(false)
    })

    test('FALSE when called on an empty list', () => {
      const list = new DoublyLinkedList()

      let result = list.containsNodeWithValue('foo')

      expect(result).toBe(false)
    })
  })
})

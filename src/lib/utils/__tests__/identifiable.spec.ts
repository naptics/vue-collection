import { describe, expect, test } from 'vitest'
import { Id } from '../identifiable'

const one = { id: 'id1', label: 'one' }
const two = { id: 'id2', label: 'two' }
const three = { id: 'id3', label: 'three' }
const four = { id: 'id4', label: 'four' }
const all = [one, two, three, four]

describe('identifiable', () => {
    test('find', () => {
        expect(Id.find(all, 'id1')).toMatchObject(one)
        expect(Id.find(all, 'id3')).toMatchObject(three)
        // check if the first is picked if multiple
        expect(Id.find([...all, { id: 'id2', label: 'new' }], 'id2')).toMatchObject(two)
        // check if undefined is returned if not found
        expect(Id.find(all, 'id')).toBeUndefined()
    })

    test('contains', () => {
        expect(Id.contains(all, 'id1')).toBe(true)
        expect(Id.contains(all, 'id3')).toBe(true)
        expect(Id.contains(all, 'id5')).toBe(false)
        expect(Id.contains(all, 'id')).toBe(false)
    })

    test('insert', () => {
        const before = [one, two, three]
        let modify = [...before]

        let after = Id.insert(modify, two, one)
        // Check if array is still the same
        expect(after).toMatchObject(before)
        // Check if the reference is the same
        expect(after).toBe(modify)

        modify = [...before]
        after = Id.insert(modify, four, three)
        expect(after).toMatchObject([one, two, three, four])

        modify = [...before]
        const twoModified = { id: 'id2', label: 'twoooo' }
        after = Id.insert(modify, twoModified)
        expect(after).toMatchObject([one, twoModified, three])
    })

    test('remove', () => {
        const before = [one, two, three]
        let modify = [...before]

        let after = Id.remove(modify, 'id')
        // Check if array is still the same
        expect(after).toMatchObject(before)
        // Check if the reference is the same
        expect(after).toBe(modify)

        modify = [...before]
        after = Id.remove(modify, 'id2')
        expect(after).toMatchObject([one, three])

        modify = [one, two, three, four]
        after = Id.remove(modify, 'id1', 'id3')
        expect(after).toMatchObject([two, four])
    })

    test('areSameArrays', () => {
        const allDifferent = all.map(item => ({ ...item, label: 'different' }))
        expect(Id.areSameArrays(all, allDifferent)).toBe(true)
        expect(Id.areSameArrays(all, allDifferent.slice(1))).toBe(false)
        expect(Id.areSameArrays(all, allDifferent.reverse())).toBe(false)
    })
})

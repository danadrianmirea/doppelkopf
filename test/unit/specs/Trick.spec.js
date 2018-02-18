import Trick from '@/components/Trick'
import { Game } from '@/models/game'
import { trickRegistry } from '@/models/trickRegistry'
import { mount } from '@vue/test-utils'
import { ace, suits } from '@/models/card'

let game
let trick

beforeEach(() => {
  game = new Game()
  trick = trickRegistry.current()
})

describe('Trick.vue', () => {
  test('should show empty trick on initialization', () => {
    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})
    expect(wrapper.findAll('div.card').length).toEqual(0)
  })

  test('should render cards in current trick', () => {
    trick.add(ace.of(suits.hearts), game.players[0])

    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})

    expect(wrapper.findAll('div.card').length).toEqual(1)
  })

  test('should render winner', () => {
    trick.add(ace.of(suits.hearts), game.players[0])

    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})

    expect(wrapper.find('div.winner').text()).toContain(game.players[0].name)
  })

  test('should not render winner if trick is empty', () => {
    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})

    expect(wrapper.find('div.winner').exists()).toBe(false)
  })

  test('should render next button if trick is finished', () => {
    trick.add(ace.of(suits.hearts), game.players[0])
    trick.add(ace.of(suits.hearts), game.players[1])
    trick.add(ace.of(suits.hearts), game.players[2])
    trick.add(ace.of(suits.hearts), game.players[3])

    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})

    expect(wrapper.find('div.next').exists()).toBe(true)
  })

  test('should not render next button if trick is empty', () => {
    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})

    expect(wrapper.find('div.next').exists()).toBe(false)
  })

  test('should emit next trick event if next button is clicked', () => {
    trick.add(ace.of(suits.hearts), game.players[0])
    trick.add(ace.of(suits.hearts), game.players[1])
    trick.add(ace.of(suits.hearts), game.players[2])
    trick.add(ace.of(suits.hearts), game.players[3])
    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})

    wrapper.find('div.next').trigger('click')

    expect(wrapper.emitted().nextTrick.length).toBe(1)
  })
})

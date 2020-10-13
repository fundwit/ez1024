import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import DashBoard from '@/components/DashBoard.vue'

describe('DashBoard.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(DashBoard, {
    })
    expect(wrapper.text()).to.include('Base64')
  })
})

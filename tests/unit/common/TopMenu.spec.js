import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import TopMenu from '@/components/common/TopMenu.vue'

describe('TopMenu.vue', () => {
  it('shoudl render top menu', () => {
    const wrapper = mount(TopMenu, {
    })
    expect(wrapper.text()).to.include('EZ1024')
    expect(wrapper.text()).to.include('Home')
    expect(wrapper.text()).to.include('About')
    expect(wrapper.text()).to.include('User Status')
  })
})

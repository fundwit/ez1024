import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import CodecBase64 from '../../src/components/CodecBase64'

describe('CodeBase64.vue', () => {
  it('输入普通文本时应该显示正确的base64编码', async () => {
    const wrapper = mount(CodecBase64)
    expect(wrapper.vm.$data.isEncodeMode).to.equal(true)

    const plainText = wrapper.get('.plain-text')

    await plainText.trigger('focus')
    await plainText.setValue('abcd') // 设置值+trigger

    expect(wrapper.vm.$data.isEncodeMode).to.equal(true)
    // expect(plainText.text()).to.equal('abcd')
    // expect(base64Test.text()).to.equal('YWJjZA==')

    expect(wrapper.vm.$data.plain).to.equal('abcd')
    expect(wrapper.vm.$data.base64).to.equal('YWJjZA==')

    await plainText.setValue('abcd1') // 设置值+trigger
    // expect(base64Test.text()).to.equal('YWJjZDE=')
    expect(wrapper.vm.$data.plain).to.equal('abcd1')
    expect(wrapper.vm.$data.base64).to.equal('YWJjZDE=')
  })

  it('输入正确的base64时应该显示正确的普通文本', async () => {
    const wrapper = mount(CodecBase64)
    expect(wrapper.vm.$data.isEncodeMode).to.equal(true)

    const base64Test = wrapper.get('.base64-text')
    await base64Test.trigger('focus')
    expect(wrapper.vm.$data.isEncodeMode).to.equal(false)

    await base64Test.setValue('YWJjZA==') // 设置值+trigger
    expect(wrapper.vm.$data.plain).to.equal('abcd')
    expect(wrapper.vm.$data.base64).to.equal('YWJjZA==')
    expect(wrapper.vm.$data.isBase64CodeInvalid).to.equal(false)

    await base64Test.setValue('YWJjZDE=') // 设置值+trigger
    // expect(base64Test.text()).to.equal('YWJjZDE=')
    expect(wrapper.vm.$data.plain).to.equal('abcd1')
    expect(wrapper.vm.$data.base64).to.equal('YWJjZDE=')
  })

  it('输入错误的base64时应该显示错误提示', async () => {
    const wrapper = mount(CodecBase64)

    const base64Test = wrapper.get('.base64-text')
    await base64Test.trigger('focus')
    expect(wrapper.vm.$data.isBase64CodeInvalid).to.equal(false)

    // TODO FIX THIS
    // await base64Test.setValue('12345') // 设置值+trigger
    // expect(wrapper.vm.$data.plain).to.equal('')
    // expect(wrapper.vm.$data.isBase64CodeInvalid).to.equal(true)

    await base64Test.setValue('YWJjZDE=') // 设置值+trigger
    expect(wrapper.vm.$data.isBase64CodeInvalid).to.equal(false)
    expect(wrapper.vm.$data.plain).to.equal('abcd1')
    expect(wrapper.vm.$data.base64).to.equal('YWJjZDE=')
  })
})

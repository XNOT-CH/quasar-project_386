import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { QPage, QBtn } from 'quasar';
import IndexPage from 'src/pages/IndexPage.vue';

installQuasarPlugin({ components: { QPage, QBtn } });

// QPage renders nothing outside of a QLayout, so it's stubbed as a
// transparent passthrough here to keep IndexPage's content testable in isolation.
const globalStubs = {
  RouterLink: RouterLinkStub,
  QPage: { template: '<div><slot /></div>' },
};

describe('IndexPage', () => {
  it('should render the Quasar logo', () => {
    const wrapper = mount(IndexPage, {
      global: { stubs: globalStubs },
    });
    const logo = wrapper.find('img[alt="Quasar logo"]');

    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toBeDefined();
  });

  it('should render a button linking to the second page', () => {
    const wrapper = mount(IndexPage, {
      global: { stubs: globalStubs },
    });
    const button = wrapper.findComponent(QBtn);

    expect(button.exists()).toBe(true);
    expect(button.props('to')).toBe('/second');
    expect(button.props('label')).toBe('Go to Second Page');
  });
});

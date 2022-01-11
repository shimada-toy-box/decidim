# frozen_string_literal: true

require "spec_helper"
require "pry-rails"

describe "Offline", type: :system, js: true do
  let(:organization) { create(:organization, host: "localhost") }

  before do
    switch_to_host organization.host
  end

  context "when there's no internet connection" do
    before do
      # page.execute_script "window.navigator = { onLine: false }"
      # page.execute_script "window.caches.delete('pages')"
      page.visit decidim.root_path
      # params = {
      #   cmd: 'Network.emulateNetworkConditions',
      #   params: {
      #     offline: true,
      #     latency: 0,
      #     downloadThroughput: 0,
      #     uploadThroughput: 0
      #   }
      # }
      # page.driver.browser.send(:bridge).send_command(params)
    end

    it "redirects to system UI and shows a warning" do
      # params = {
      #   cmd: 'Network.emulateNetworkConditions',
      #   params: {
      #     offline: true,
      #     latency: 0,
      #     downloadThroughput: 0,
      #     uploadThroughput: 0
      #   }
      # }
      # page.driver.browser.send(:bridge).send_command(params)

      # page.driver.browser.network_conditions = { offline: true, latency: 0, throughput: 0 }
      # redirection = "http://#{URI.parse(current_url).host}:#{URI.parse(current_url).port}/initiatives?locale=es"

      redirection = "http://#{URI.parse(current_url).host}:#{URI.parse(current_url).port}/pages?locale=es"
      page.driver.browser.delete_network_conditions
      page.driver.browser.network_conditions = { offline: true, latency: 0, throughput: 0 }

      binding.pry # http://localhost:55128/initiatives?locale=es
      page.visit redirection
      save_and_open_screenshot
      expect(page).to have_content("You must create an organization to get started")
    end
  end
end

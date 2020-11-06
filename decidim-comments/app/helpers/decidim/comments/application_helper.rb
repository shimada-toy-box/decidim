# frozen_string_literal: true

require "webpacker/helper"

module Decidim
  module Comments
    module ApplicationHelper
      include ::Webpacker::Helper

      def current_webpacker_instance
        Decidim::Comments.webpacker
      end
    end
  end
end

# frozen_string_literal: true

module Decidim
  # This cell renders the button to follow the given resource.
  class RedesignedFollowButtonCell < Decidim::RedesignedButtonCell
    def show
      return if model == current_user

      render
    end

    private

    def button_classes
      "button button__sm button__text-secondary only:m-auto"
    end

    def text
      current_user_follows? ? t("decidim.follows.destroy.button") : t("decidim.follows.create.button")
    end

    def path
      decidim.follow_path(req_params)
    end

    def req_params
      { follow: { followable_gid: model.to_sgid.to_s } }
    end

    def method
      current_user_follows? ? :delete : :post
    end

    def icon_name
      current_user_follows? ? "notification-3-fill" : "notification-3-line"
    end

    def remote
      true
    end

    def current_user_follows?
      return false unless current_user

      current_user.follows?(model)
    end

    def decidim
      Decidim::Core::Engine.routes.url_helpers
    end
  end
end

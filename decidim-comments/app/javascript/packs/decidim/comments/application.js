import { CommentsComponent } from "../../../src/comments";

$(() => {
  $("[data-decidim-comments]").each((_i, el) => {
    const $el = $(el);
    const comments = new CommentsComponent($el, $el.data("decidim-comments"));
    comments.mountComponent();
    $(el).data("comments", comments);
  });
});
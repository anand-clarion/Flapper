class CommentsController < ApplicationController
  respond_to :json

  def create
    post = Post.where(id: params[:post_id]).includes([{comments: :likes}, :likes]).first
    comment = post.comments.create(comment_params.merge(user_id: current_user.id))
    respond_with post.to_json(include: [{comments: {include: :likes}}, :likes]), :location => nil
  end

  def destroy
    post = Post.find(params[:post_id])
    comment = post.comments.find(params[:id])
    respond_with comment.destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :likes)
  end
end

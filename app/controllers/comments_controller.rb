class CommentsController < ApplicationController
  respond_to :json

  def create
    post = Post.find(params[:post_id])
    comment = post.comments.create(comment_params.merge(user_id: current_user.id))
    respond_with post, comment.to_json(include: :likes), :location => nil
  end

  def addvote
    post = Post.find(params[:post_id])
    comment = post.comments.find(params[:id])
    respond_with comment.increment!(:likes)
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

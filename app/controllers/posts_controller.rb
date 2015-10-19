class PostsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def new
    @post = Post.new
  end

  def index
    respond_with Post.all.to_json(include: :user)
  end

  def create
    Post.create(post_params.merge(user_id: current_user.id))
    respond_with Post.all.to_json(include: :user), :location => nil
  end

  def show
    final = []
    post = Post.find(params[:id]).to_json(include: [{comments: {include: :likes}}, :likes])
    respond_with post
  end

  def edit
    respond_with Post.find(params[:id])
  end

  def addvote
    post = Post.find(params[:id])
    post.likes += 1
    respond_with post.save!
  end

  def destroy
    post = Post.find(params[:id])
    respond_with post.destroy
  end

  private
    def post_params
      params.require(:post).permit(:title, :content, :likes)
    end
end

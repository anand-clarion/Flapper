class PostsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def new
    @post = Post.new
  end

  def index
    respond_with Post.all
  end

  def create
    respond_with Post.create(post_params)
  end

  def show
    final = []
    post = Post.find(params[:id])
    comment = Post.find(params[:id]).comments
    final.push(post)
    final.push(comment)
    respond_with final
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

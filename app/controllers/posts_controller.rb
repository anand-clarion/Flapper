class PostsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :edit, :destroy]

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
    respond_with @post.to_json(include: [{comments: {include: :likes}}, :likes])
  end

  def edit
    respond_with @post
  end

  def destroy
    respond_with @post.destroy
  end

  private
    def post_params
      params.require(:post).permit(:title, :content, :likes)
    end

    def set_post
      @post = Post.find(params[:id])
    end
end

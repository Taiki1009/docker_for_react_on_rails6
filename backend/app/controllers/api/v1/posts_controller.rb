module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: %i[show destroy update]

      # GET /api/v1/posts
      def index
        get_response = Post::V1.list(params)
        render json: get_response[:data], status: get_response[:status]
      end

      def show
        render json: @post, status: :ok
      end

      # POST /api/v1/posts
      def create
        get_response = Post::V1.create(post_params)
        render json: get_response[:data], status: get_response[:status]
      end

      def update
        if @post.update(post_params)
          render json: @post, status: :created
        else
          render json: @post.errors, status: :internal_server_error
        end
      end

      def destroy
        if @post.destroy
          render json: @post, status: :ok
        else
          render json: @post.errors, status: :internal_server_error
        end
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end

      def post_params
        params.require(:post).permit(:title, :content)
      end
    end
  end
end

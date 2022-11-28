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
        get_response = Post::V1.show(@post)
        render json: get_response[:data], status: get_response[:status]
      end

      # POST /api/v1/posts
      def create
        get_response = Post::V1.create(post_params)
        render json: get_response[:data], status: get_response[:status]
      end

      # PATCH /api/v1/posts/:id
      def update
        get_response = Post::V1.update(@post, post_params)
        render json: get_response[:data], status: get_response[:status]
      end

      # DELETE /api/v1/posts/:id
      def destroy
        get_response = Post::V1.destroy(@post)
        render json: get_response[:data], status: get_response[:status]
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

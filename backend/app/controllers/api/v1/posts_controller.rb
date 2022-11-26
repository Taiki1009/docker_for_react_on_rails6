module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: %i[show destroy update]

      def index
        limit = params[:limit]
        offset = params[:offset]
        posts = Post.all.limit(limit).offset(offset).order(:id)
        render json: posts, status: :ok
      end

      def show
        render json: @post, status: :ok
      end

      def create
        post = Post.new(post_params)
        if post.save
          render json: post, status: :created
        else
          render json: post.errors, status: :internal_server_error
        end
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

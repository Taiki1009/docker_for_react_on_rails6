class Post < ApplicationRecord
  class V1
    def self.list(request_params)
      posts = Post.all.limit(request_params[:limit]).offset(request_params[:offset]).order(created_at: :desc)
      has_next = Post.all.length > request_params[:limit].to_i

      {
        data: { results: posts, hasNext: has_next },
        status: 200
      }
    end

    def self.show(post)
      { data: { results: post }, status: :ok }
    end

    def self.create(request_params)
      post = Post.new(request_params)
      if post.save
        { data: { results: post }, status: :created }
      else
        { data: { results: post.errors }, status: :internal_server_error }
      end
    end

    def self.update(post, request_params)
      if post.update(request_params)
        { data: { results: post }, status: :created }
      else
        { data: { results: post.errors }, status: :internal_server_error }
      end
    end

    def self.destroy(post)
      if post.destroy
        { data: { results: post }, status: :ok }
      else
        { data: { results: post.errors }, status: :internal_server_error }
      end
    end
  end
end

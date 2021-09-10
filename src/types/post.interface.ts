export interface IPostCreateSubmit {
  postTitle: string,
  postDescription: string,
  postImageBefore: any,
}

export interface IGetPostQuery {
  postId: string, 
  slugTitle: string 
}

// title, description
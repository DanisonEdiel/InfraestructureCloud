export interface Post {
    ok: boolean
    data: DataRequest
}

export interface DataResponse {
    id: number
  name: string
  comment: string
  image_url: string
  public_id: string
  created_at: string
}

export interface DataRequest {
    name: string
    comment: string
    photo: string
    public_id: string
}
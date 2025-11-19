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
    id: number
    name: string
    comment: string
    image_url: string
    public_id: string
}
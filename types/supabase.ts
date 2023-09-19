export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          comment_id: number
          date_added: string | null
          product_id: number | null
          text: string
          user_id: string
        }
        Insert: {
          comment_id?: number
          date_added?: string | null
          product_id?: number | null
          text: string
          user_id: string
        }
        Update: {
          comment_id?: number
          date_added?: string | null
          product_id?: number | null
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      number_of_stars: {
        Row: {
          comment_id: number
          product_id: number
          star_id: number
          stars_given: number
          user_id: string
        }
        Insert: {
          comment_id: number
          product_id: number
          star_id?: number
          stars_given: number
          user_id: string
        }
        Update: {
          comment_id?: number
          product_id?: number
          star_id?: number
          stars_given?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "number_of_stars_comment_id_fkey"
            columns: ["comment_id"]
            referencedRelation: "comments"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "number_of_stars_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "number_of_stars_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          average_grade: number | null
          date_added: string | null
          date_edited: string | null
          description: string | null
          image_url: string | null
          number_of_votes: number | null
          product_id: number
          title: string
        }
        Insert: {
          average_grade?: number | null
          date_added?: string | null
          date_edited?: string | null
          description?: string | null
          image_url?: string | null
          number_of_votes?: number | null
          product_id?: number
          title: string
        }
        Update: {
          average_grade?: number | null
          date_added?: string | null
          date_edited?: string | null
          description?: string | null
          image_url?: string | null
          number_of_votes?: number | null
          product_id?: number
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

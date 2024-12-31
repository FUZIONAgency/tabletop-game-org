export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attribute_values: {
        Row: {
          attribute_id: string | null
          created_at: string
          id: string
          updated_at: string
          value: string
        }
        Insert: {
          attribute_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          value: string
        }
        Update: {
          attribute_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "attribute_values_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "product_attributes"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_tags_relation: {
        Row: {
          blog_id: string | null
          created_at: string
          id: string
          tag_id: string | null
        }
        Insert: {
          blog_id?: string | null
          created_at?: string
          id?: string
          tag_id?: string | null
        }
        Update: {
          blog_id?: string | null
          created_at?: string
          id?: string
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_tags_relation_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_tags_relation_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author_id: string | null
          blog_image_url: string | null
          content: string
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          blog_image_url?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          blog_image_url?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      campaign_invitations: {
        Row: {
          campaign_id: string | null
          created_at: string
          email: string | null
          expires_at: string | null
          id: string
          status: string | null
          token: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          status?: string | null
          token?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          status?: string | null
          token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_invitations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_players: {
        Row: {
          campaign_id: string
          id: string
          joined_at: string | null
          player_id: string
          role_type: string
          status: string | null
        }
        Insert: {
          campaign_id?: string
          id?: string
          joined_at?: string | null
          player_id?: string
          role_type: string
          status?: string | null
        }
        Update: {
          campaign_id?: string
          id?: string
          joined_at?: string | null
          player_id?: string
          role_type?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_players_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "campaign_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_types: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          created_at: string
          description: string | null
          game_system_id: string
          id: string
          max_players: number
          min_players: number
          price: number
          retailer_id: string | null
          status: string | null
          title: string
          type: string | null
          type_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          game_system_id?: string
          id?: string
          max_players?: number
          min_players?: number
          price?: number
          retailer_id?: string | null
          status?: string | null
          title: string
          type?: string | null
          type_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          game_system_id?: string
          id?: string
          max_players?: number
          min_players?: number
          price?: number
          retailer_id?: string | null
          status?: string | null
          title?: string
          type?: string | null
          type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_game_system_id_fkey"
            columns: ["game_system_id"]
            isOneToOne: false
            referencedRelation: "game_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "campaign_types"
            referencedColumns: ["id"]
          },
        ]
      }
      condition_types: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          budget: string
          created_at: string
          email: string
          id: string
          name: string
          templateType: string
          website: string | null
        }
        Insert: {
          budget: string
          created_at?: string
          email: string
          id?: string
          name: string
          templateType: string
          website?: string | null
        }
        Update: {
          budget?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          templateType?: string
          website?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      conventions: {
        Row: {
          carousel_image: string | null
          created_at: string
          description: string | null
          end_date: string
          expected_attendees: number | null
          id: string
          image_url: string
          is_featured: boolean | null
          location: string
          name: string
          registration_url: string | null
          start_date: string
          status: string | null
          updated_at: string | null
          venue: string
          website_url: string | null
        }
        Insert: {
          carousel_image?: string | null
          created_at?: string
          description?: string | null
          end_date: string
          expected_attendees?: number | null
          id?: string
          image_url: string
          is_featured?: boolean | null
          location: string
          name: string
          registration_url?: string | null
          start_date: string
          status?: string | null
          updated_at?: string | null
          venue: string
          website_url?: string | null
        }
        Update: {
          carousel_image?: string | null
          created_at?: string
          description?: string | null
          end_date?: string
          expected_attendees?: number | null
          id?: string
          image_url?: string
          is_featured?: boolean | null
          location?: string
          name?: string
          registration_url?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
          venue?: string
          website_url?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      customer_prices: {
        Row: {
          created_at: string
          customer_id: string | null
          end_date: string | null
          id: string
          price: number
          sku_id: string | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          end_date?: string | null
          id?: string
          price: number
          sku_id?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          end_date?: string | null
          id?: string
          price?: number
          sku_id?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_prices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_prices_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "skus"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_questions: {
        Row: {
          created_at: string
          exam_id: string
          id: string
          name: string
          order: number | null
          updated_at: string
          url: string | null
          weight: number
        }
        Insert: {
          created_at?: string
          exam_id: string
          id?: string
          name: string
          order?: number | null
          updated_at?: string
          url?: string | null
          weight?: number
        }
        Update: {
          created_at?: string
          exam_id?: string
          id?: string
          name?: string
          order?: number | null
          updated_at?: string
          url?: string | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "exam_questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          created_at: string
          game_system_id: string
          id: string
          name: string
          updated_at: string
          weight: number
        }
        Insert: {
          created_at?: string
          game_system_id: string
          id?: string
          name: string
          updated_at?: string
          weight?: number
        }
        Update: {
          created_at?: string
          game_system_id?: string
          id?: string
          name?: string
          updated_at?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "exams_game_system_id_fkey"
            columns: ["game_system_id"]
            isOneToOne: false
            referencedRelation: "game_systems"
            referencedColumns: ["id"]
          },
        ]
      }
      game_system_links: {
        Row: {
          at_tag: string | null
          created_at: string
          game_system_id: string | null
          hash_tag: string | null
          id: string
          link_type_id: string | null
          name: string | null
          url: string | null
        }
        Insert: {
          at_tag?: string | null
          created_at?: string
          game_system_id?: string | null
          hash_tag?: string | null
          id?: string
          link_type_id?: string | null
          name?: string | null
          url?: string | null
        }
        Update: {
          at_tag?: string | null
          created_at?: string
          game_system_id?: string | null
          hash_tag?: string | null
          id?: string
          link_type_id?: string | null
          name?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_system_links_link_type_id_fkey"
            columns: ["link_type_id"]
            isOneToOne: false
            referencedRelation: "link_types"
            referencedColumns: ["id"]
          },
        ]
      }
      game_systems: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo_image_url: string | null
          name: string
          status: string | null
          type: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo_image_url?: string | null
          name: string
          status?: string | null
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo_image_url?: string | null
          name?: string
          status?: string | null
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          quantity: number
          reference_id: string | null
          sku_id: string | null
          transaction_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          quantity: number
          reference_id?: string | null
          sku_id?: string | null
          transaction_type: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          quantity?: number
          reference_id?: string | null
          sku_id?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "skus"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_transactions: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          quantity: number
          reference_id: string | null
          sku_id: string | null
          transaction_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          quantity: number
          reference_id?: string | null
          sku_id?: string | null
          transaction_type: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          quantity?: number
          reference_id?: string | null
          sku_id?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "skus"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          accepted_at: string | null
          accepted_by_player_id: string | null
          cell: string | null
          created_at: string | null
          date_decided: string | null
          date_read: string | null
          date_sent: string | null
          decision: string | null
          email: string
          first_name: string | null
          id: string
          is_opt_out: boolean | null
          last_name: string | null
          status: string
          token: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_by_player_id?: string | null
          cell?: string | null
          created_at?: string | null
          date_decided?: string | null
          date_read?: string | null
          date_sent?: string | null
          decision?: string | null
          email: string
          first_name?: string | null
          id?: string
          is_opt_out?: boolean | null
          last_name?: string | null
          status?: string
          token?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          accepted_at?: string | null
          accepted_by_player_id?: string | null
          cell?: string | null
          created_at?: string | null
          date_decided?: string | null
          date_read?: string | null
          date_sent?: string | null
          decision?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_opt_out?: boolean | null
          last_name?: string | null
          status?: string
          token?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_accepted_by_player_id_fkey"
            columns: ["accepted_by_player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "invites_accepted_by_player_id_fkey"
            columns: ["accepted_by_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      link_types: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      location_types: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          address: string | null
          city: string | null
          country_id: string | null
          created_at: string
          id: string
          lat: number | null
          lng: number | null
          name: string | null
          postal_code: string | null
          square_feet: number | null
          state: string | null
          type_id: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country_id?: string | null
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string | null
          postal_code?: string | null
          square_feet?: number | null
          state?: string | null
          type_id?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country_id?: string | null
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string | null
          postal_code?: string | null
          square_feet?: number | null
          state?: string | null
          type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "location_types"
            referencedColumns: ["id"]
          },
        ]
      }
      metro: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          recipient: string
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          recipient: string
          status?: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          recipient?: string
          status?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      offer_statuses: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      offer_types: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      offers: {
        Row: {
          amount: number | null
          created_at: string | null
          date_expiration: string | null
          date_posted: string | null
          description: string | null
          id: string
          max_uses: number | null
          name: string
          renewal_months: number | null
          status_id: string
          type_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date_expiration?: string | null
          date_posted?: string | null
          description?: string | null
          id?: string
          max_uses?: number | null
          name: string
          renewal_months?: number | null
          status_id: string
          type_id: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date_expiration?: string | null
          date_posted?: string | null
          description?: string | null
          id?: string
          max_uses?: number | null
          name?: string
          renewal_months?: number | null
          status_id?: string
          type_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "offer_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_type_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "offer_types"
            referencedColumns: ["id"]
          },
        ]
      }
      person: {
        Row: {
          cell: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          cell?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          cell?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      player_exam_answers: {
        Row: {
          boolean_answer: boolean | null
          created_at: string
          date_answer: string | null
          exam_id: string
          exam_question_id: string
          id: string
          numeric_answer: number | null
          player_id: string
          text_answer: string | null
          updated_at: string
          uuid_answer: string | null
        }
        Insert: {
          boolean_answer?: boolean | null
          created_at?: string
          date_answer?: string | null
          exam_id: string
          exam_question_id: string
          id?: string
          numeric_answer?: number | null
          player_id: string
          text_answer?: string | null
          updated_at?: string
          uuid_answer?: string | null
        }
        Update: {
          boolean_answer?: boolean | null
          created_at?: string
          date_answer?: string | null
          exam_id?: string
          exam_question_id?: string
          id?: string
          numeric_answer?: number | null
          player_id?: string
          text_answer?: string | null
          updated_at?: string
          uuid_answer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_exam_answers_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_exam_answers_exam_question_id_fkey"
            columns: ["exam_question_id"]
            isOneToOne: false
            referencedRelation: "exam_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_exam_answers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_exam_answers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_exams: {
        Row: {
          approval_player_id: string | null
          created_at: string
          exam_id: string
          id: string
          player_id: string
          score: number | null
          updated_at: string
        }
        Insert: {
          approval_player_id?: string | null
          created_at?: string
          exam_id: string
          id?: string
          player_id: string
          score?: number | null
          updated_at?: string
        }
        Update: {
          approval_player_id?: string | null
          created_at?: string
          exam_id?: string
          id?: string
          player_id?: string
          score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_exams_approval_player_id_fkey"
            columns: ["approval_player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_exams_approval_player_id_fkey"
            columns: ["approval_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_exams_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_exams_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_exams_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_game_accounts: {
        Row: {
          account_id: string
          created_at: string | null
          game_system_id: string
          id: string
          player_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          account_id: string
          created_at?: string | null
          game_system_id?: string
          id?: string
          player_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          created_at?: string | null
          game_system_id?: string
          id?: string
          player_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_game_accounts_game_system_id_fkey"
            columns: ["game_system_id"]
            isOneToOne: false
            referencedRelation: "game_systems"
            referencedColumns: ["id"]
          },
        ]
      }
      player_ratings: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          player_id: string
          rating: number
          rating_player_id: string
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          player_id: string
          rating: number
          rating_player_id: string
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          player_id?: string
          rating?: number
          rating_player_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_ratings_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_ratings_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_ratings_rating_player_id_fkey"
            columns: ["rating_player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_ratings_rating_player_id_fkey"
            columns: ["rating_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_relationships: {
        Row: {
          created_at: string | null
          downline_id: string
          id: string
          status: string | null
          type: string
          updated_at: string | null
          upline_id: string
        }
        Insert: {
          created_at?: string | null
          downline_id: string
          id?: string
          status?: string | null
          type?: string
          updated_at?: string | null
          upline_id: string
        }
        Update: {
          created_at?: string | null
          downline_id?: string
          id?: string
          status?: string | null
          type?: string
          updated_at?: string | null
          upline_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_relationships_downline_id_fkey"
            columns: ["downline_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_relationships_downline_id_fkey"
            columns: ["downline_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_relationships_upline_id_fkey"
            columns: ["upline_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_relationships_upline_id_fkey"
            columns: ["upline_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_retailers: {
        Row: {
          created_at: string | null
          id: string
          player_id: string
          retailer_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          player_id: string
          retailer_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          player_id?: string
          retailer_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_retailers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_retailers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_retailers_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          },
        ]
      }
      player_sessions: {
        Row: {
          attendance_status: string
          created_at: string
          id: string
          payment_status: string
          player_id: string
          session_id: string
          updated_at: string | null
        }
        Insert: {
          attendance_status?: string
          created_at?: string
          id?: string
          payment_status?: string
          player_id: string
          session_id: string
          updated_at?: string | null
        }
        Update: {
          attendance_status?: string
          created_at?: string
          id?: string
          payment_status?: string
          player_id?: string
          session_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_sessions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_sessions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_sessions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          alias: string
          alias_image_url: string | null
          auth_id: string | null
          city: string | null
          created_at: string | null
          email: string | null
          id: string
          state: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          alias: string
          alias_image_url?: string | null
          auth_id?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          state?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          alias?: string
          alias_image_url?: string | null
          auth_id?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          state?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prize_cards: {
        Row: {
          card_image_url: string
          card_name: string
          created_at: string | null
          created_by: string | null
          id: string
          prize_id: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          card_image_url: string
          card_name: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          prize_id?: string
          sort_order: number
          updated_at?: string | null
        }
        Update: {
          card_image_url?: string
          card_name?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          prize_id?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      product_attributes: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          base_price: number
          brand: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          base_price: number
          brand?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          base_price?: number
          brand?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          is_over_13: boolean | null
          retailers_max: number | null
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          is_over_13?: boolean | null
          retailers_max?: number | null
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_over_13?: boolean | null
          retailers_max?: number | null
          role?: string | null
          username?: string | null
        }
        Relationships: []
      }
      retailer_person_roles: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      retailer_persons: {
        Row: {
          created_at: string
          id: string
          person_id: string | null
          retailer_id: string | null
          role_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          person_id?: string | null
          retailer_id?: string | null
          role_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          person_id?: string | null
          retailer_id?: string | null
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "retailer_persons_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retailer_persons_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retailer_persons_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "retailer_person_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      retailer_types: {
        Row: {
          created_at: string
          id: string
          name: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          source?: string | null
        }
        Relationships: []
      }
      retailers: {
        Row: {
          address: string
          address_1: string | null
          carousel_image: string | null
          city: string
          country_id: string | null
          created_at: string | null
          description: string | null
          email: string | null
          hours_of_operation: Json | null
          id: string
          import_first_name: string | null
          import_gama_id: string | null
          import_has_purchased_amount: number | null
          import_is_tax_exempt: string | null
          import_last_name: string | null
          import_opt_in_email: string | null
          import_opt_in_sms: string | null
          import_order_count: number | null
          is_featured: boolean | null
          lat: number
          lng: number
          metro_id: string | null
          name: string
          phone: string | null
          state: string
          status: string | null
          store_photo: string | null
          type_id: string | null
          updated_at: string | null
          website_url: string | null
          zip: string
        }
        Insert: {
          address: string
          address_1?: string | null
          carousel_image?: string | null
          city: string
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          hours_of_operation?: Json | null
          id?: string
          import_first_name?: string | null
          import_gama_id?: string | null
          import_has_purchased_amount?: number | null
          import_is_tax_exempt?: string | null
          import_last_name?: string | null
          import_opt_in_email?: string | null
          import_opt_in_sms?: string | null
          import_order_count?: number | null
          is_featured?: boolean | null
          lat: number
          lng: number
          metro_id?: string | null
          name: string
          phone?: string | null
          state: string
          status?: string | null
          store_photo?: string | null
          type_id?: string | null
          updated_at?: string | null
          website_url?: string | null
          zip: string
        }
        Update: {
          address?: string
          address_1?: string | null
          carousel_image?: string | null
          city?: string
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          hours_of_operation?: Json | null
          id?: string
          import_first_name?: string | null
          import_gama_id?: string | null
          import_has_purchased_amount?: number | null
          import_is_tax_exempt?: string | null
          import_last_name?: string | null
          import_opt_in_email?: string | null
          import_opt_in_sms?: string | null
          import_order_count?: number | null
          is_featured?: boolean | null
          lat?: number
          lng?: number
          metro_id?: string | null
          name?: string
          phone?: string | null
          state?: string
          status?: string | null
          store_photo?: string | null
          type_id?: string | null
          updated_at?: string | null
          website_url?: string | null
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "retailers_metro_id_fkey"
            columns: ["metro_id"]
            isOneToOne: false
            referencedRelation: "metro"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          campaign_id: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          price: number
          session_number: number
          start_date: string
          status: string | null
        }
        Insert: {
          campaign_id?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          price: number
          session_number: number
          start_date: string
          status?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          price?: number
          session_number?: number
          start_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      sku_attributes: {
        Row: {
          attribute_value_id: string | null
          created_at: string
          id: string
          sku_id: string | null
        }
        Insert: {
          attribute_value_id?: string | null
          created_at?: string
          id?: string
          sku_id?: string | null
        }
        Update: {
          attribute_value_id?: string | null
          created_at?: string
          id?: string
          sku_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sku_attributes_attribute_value_id_fkey"
            columns: ["attribute_value_id"]
            isOneToOne: false
            referencedRelation: "attribute_values"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sku_attributes_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "skus"
            referencedColumns: ["id"]
          },
        ]
      }
      sku_instance_statuses: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      sku_instances: {
        Row: {
          amount_owed: number | null
          amount_paid: number | null
          condition_id: string | null
          created_at: string
          description: string | null
          id: string
          location_id: string | null
          master_sku_id: string | null
          product_id: string | null
          quantity: number | null
          status_id: string | null
          updated_at: string
        }
        Insert: {
          amount_owed?: number | null
          amount_paid?: number | null
          condition_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location_id?: string | null
          master_sku_id?: string | null
          product_id?: string | null
          quantity?: number | null
          status_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_owed?: number | null
          amount_paid?: number | null
          condition_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location_id?: string | null
          master_sku_id?: string | null
          product_id?: string | null
          quantity?: number | null
          status_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sku_instances_condition_id_fkey"
            columns: ["condition_id"]
            isOneToOne: false
            referencedRelation: "condition_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sku_instances_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sku_instances_master_sku_id_fkey"
            columns: ["master_sku_id"]
            isOneToOne: false
            referencedRelation: "skus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sku_instances_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sku_instances_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "sku_instance_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      skus: {
        Row: {
          created_at: string
          id: string
          inventory_quantity: number | null
          price: number
          product_id: string | null
          sku_code: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          inventory_quantity?: number | null
          price: number
          product_id?: string | null
          sku_code: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          inventory_quantity?: number | null
          price?: number
          product_id?: string | null
          sku_code?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_entries: {
        Row: {
          created_at: string | null
          final_rank: number | null
          id: string
          player_id: string
          registration_date: string | null
          status: string | null
          tournament_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          final_rank?: number | null
          id?: string
          player_id?: string
          registration_date?: string | null
          status?: string | null
          tournament_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          final_rank?: number | null
          id?: string
          player_id?: string
          registration_date?: string | null
          status?: string | null
          tournament_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_entries_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "tournament_entries_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_entries_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_prizes: {
        Row: {
          created_at: string | null
          description: string
          id: string
          placement: number
          tournament_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          placement: number
          tournament_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          placement?: number
          tournament_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_prizes_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          carousel_image: string | null
          created_at: string | null
          description: string | null
          end_date: string
          game_system_id: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          location: string
          max_participants: number | null
          prize_pool: number | null
          registration_deadline: string | null
          registration_url: string | null
          start_date: string
          status: string | null
          title: string
          tournament_type: string | null
          updated_at: string | null
          venue: string
        }
        Insert: {
          carousel_image?: string | null
          created_at?: string | null
          description?: string | null
          end_date: string
          game_system_id?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location: string
          max_participants?: number | null
          prize_pool?: number | null
          registration_deadline?: string | null
          registration_url?: string | null
          start_date: string
          status?: string | null
          title: string
          tournament_type?: string | null
          updated_at?: string | null
          venue: string
        }
        Update: {
          carousel_image?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string
          game_system_id?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string
          max_participants?: number | null
          prize_pool?: number | null
          registration_deadline?: string | null
          registration_url?: string | null
          start_date?: string
          status?: string | null
          title?: string
          tournament_type?: string | null
          updated_at?: string | null
          venue?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_game_system_id_fkey"
            columns: ["game_system_id"]
            isOneToOne: false
            referencedRelation: "game_systems"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      player_earnings_metrics: {
        Row: {
          auth_id: string | null
          player_id: string | null
          total_convention_games: number | null
          total_game_sessions: number | null
          total_online_games: number | null
          total_retailer_games: number | null
          total_retailers: number | null
          total_tournaments: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_distance: {
        Args: {
          lat1: number
          lng1: number
          lat2: number
          lng2: number
        }
        Returns: number
      }
      get_player_earnings_metrics: {
        Args: {
          auth_uid: string
        }
        Returns: {
          total_game_sessions: number
          total_retailers: number
          total_tournaments: number
          total_online_games: number
          total_retailer_games: number
          total_convention_games: number
        }[]
      }
      get_schema_cards: {
        Args: {
          p_schema_name: string
        }
        Returns: Json[]
      }
      schema_exists: {
        Args: {
          p_schema_name: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

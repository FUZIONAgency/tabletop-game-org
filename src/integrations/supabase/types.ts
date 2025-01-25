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
      ad_campaign_metrics: {
        Row: {
          campaign_id: string
          clicks: number | null
          conversion_rate: number | null
          conversions: number | null
          cpc: number | null
          created_at: string | null
          date: string
          id: string
          impressions: number | null
          platform: string
          revenue: number | null
          roi: number | null
          spend: number | null
          updated_at: string | null
        }
        Insert: {
          campaign_id: string
          clicks?: number | null
          conversion_rate?: number | null
          conversions?: number | null
          cpc?: number | null
          created_at?: string | null
          date?: string
          id?: string
          impressions?: number | null
          platform: string
          revenue?: number | null
          roi?: number | null
          spend?: number | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string
          clicks?: number | null
          conversion_rate?: number | null
          conversions?: number | null
          cpc?: number | null
          created_at?: string | null
          date?: string
          id?: string
          impressions?: number | null
          platform?: string
          revenue?: number | null
          roi?: number | null
          spend?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_campaign_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_campaign_transactions: {
        Row: {
          amount: number
          campaign_id: string
          created_at: string | null
          description: string | null
          id: string
          platform: string
          transaction_date: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          campaign_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          platform: string
          transaction_date?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          platform?: string
          transaction_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_campaign_transactions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_campaigns: {
        Row: {
          auth_id: string
          budget: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          platform: string | null
          start_date: string | null
          status: string | null
          target_audience: string | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          platform?: string | null
          start_date?: string | null
          status?: string | null
          target_audience?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          platform?: string | null
          start_date?: string | null
          status?: string | null
          target_audience?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
      book_classes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      book_formats: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          size: Database["public"]["Enums"]["book_size"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          size: Database["public"]["Enums"]["book_size"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          size?: Database["public"]["Enums"]["book_size"]
        }
        Relationships: []
      }
      book_role_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      book_roles: {
        Row: {
          book_id: string | null
          created_at: string
          id: string
          player_id: string | null
          type_id: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string
          id?: string
          player_id?: string | null
          type_id?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string
          id?: string
          player_id?: string | null
          type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_roles_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_roles_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "book_roles_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_roles_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "book_role_types"
            referencedColumns: ["id"]
          },
        ]
      }
      book_section_types: {
        Row: {
          content_json: Json | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          content_json?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          content_json?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      book_sections: {
        Row: {
          book_id: string
          content: string | null
          content_json: Json | null
          created_at: string
          id: string
          order_index: number
          title: string
          type_id: string
          updated_at: string
        }
        Insert: {
          book_id: string
          content?: string | null
          content_json?: Json | null
          created_at?: string
          id?: string
          order_index: number
          title: string
          type_id: string
          updated_at?: string
        }
        Update: {
          book_id?: string
          content?: string | null
          content_json?: Json | null
          created_at?: string
          id?: string
          order_index?: number
          title?: string
          type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_sections_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_sections_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "book_section_types"
            referencedColumns: ["id"]
          },
        ]
      }
      book_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string
          class_id: string | null
          content_type: string | null
          created_at: string
          format_id: string | null
          id: string
          isbn: string | null
          template_id: string | null
          title: string
          type_id: string | null
          updated_at: string
        }
        Insert: {
          author: string
          class_id?: string | null
          content_type?: string | null
          created_at?: string
          format_id?: string | null
          id?: string
          isbn?: string | null
          template_id?: string | null
          title: string
          type_id?: string | null
          updated_at?: string
        }
        Update: {
          author?: string
          class_id?: string | null
          content_type?: string | null
          created_at?: string
          format_id?: string | null
          id?: string
          isbn?: string | null
          template_id?: string | null
          title?: string
          type_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "books_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "book_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_format_id_fkey"
            columns: ["format_id"]
            isOneToOne: false
            referencedRelation: "book_formats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "book_types"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          map_icon_url: string | null
          name: string
          parent: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          map_icon_url?: string | null
          name: string
          parent?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          map_icon_url?: string | null
          name?: string
          parent?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brands_parent_fkey"
            columns: ["parent"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
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
          auth_id: string | null
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
          auth_id?: string | null
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
          auth_id?: string | null
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
      contract_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          version: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          version?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          version?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          contract_text: string
          contract_type_id: string
          created_at: string | null
          description: string | null
          id: string
          markdown_preview: string | null
          name: string
          updated_at: string | null
          version: string
        }
        Insert: {
          contract_text: string
          contract_type_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          markdown_preview?: string | null
          name: string
          updated_at?: string | null
          version?: string
        }
        Update: {
          contract_text?: string
          contract_type_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          markdown_preview?: string | null
          name?: string
          updated_at?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_contract_type_id_fkey"
            columns: ["contract_type_id"]
            isOneToOne: false
            referencedRelation: "contract_types"
            referencedColumns: ["id"]
          },
        ]
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
          capital: string | null
          created_at: string
          currency: string | null
          currency_name: string | null
          currency_symbol: string | null
          geometry: unknown | null
          id: string
          iso2: string
          iso3: string
          latitude: number | null
          longitude: number | null
          name: string
          numeric_code: number | null
          phone_code: string | null
          region: string | null
          subregion: string | null
          tld: string | null
          updated_at: string
        }
        Insert: {
          capital?: string | null
          created_at?: string
          currency?: string | null
          currency_name?: string | null
          currency_symbol?: string | null
          geometry?: unknown | null
          id?: string
          iso2: string
          iso3: string
          latitude?: number | null
          longitude?: number | null
          name: string
          numeric_code?: number | null
          phone_code?: string | null
          region?: string | null
          subregion?: string | null
          tld?: string | null
          updated_at?: string
        }
        Update: {
          capital?: string | null
          created_at?: string
          currency?: string | null
          currency_name?: string | null
          currency_symbol?: string | null
          geometry?: unknown | null
          id?: string
          iso2?: string
          iso3?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          numeric_code?: number | null
          phone_code?: string | null
          region?: string | null
          subregion?: string | null
          tld?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      demo_team_contracts: {
        Row: {
          auth_id: string
          contract_accepted_at: string | null
          contract_signed_at: string | null
          contract_version: string
          created_at: string | null
          id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          auth_id: string
          contract_accepted_at?: string | null
          contract_signed_at?: string | null
          contract_version?: string
          created_at?: string | null
          id?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          auth_id?: string
          contract_accepted_at?: string | null
          contract_signed_at?: string | null
          contract_version?: string
          created_at?: string | null
          id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      demo_team_territories: {
        Row: {
          auth_id: string
          contract_id: string
          created_at: string
          id: string
          metro_id: string
          status: string
          updated_at: string
        }
        Insert: {
          auth_id?: string
          contract_id: string
          created_at?: string
          id?: string
          metro_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          auth_id?: string
          contract_id?: string
          created_at?: string
          id?: string
          metro_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "demo_team_territories_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "demo_team_contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demo_team_territories_metro_id_fkey"
            columns: ["metro_id"]
            isOneToOne: false
            referencedRelation: "metros"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_brands: {
        Row: {
          brand_id: string
          created_at: string | null
          domain_id: string
          id: string
          updated_at: string | null
        }
        Insert: {
          brand_id: string
          created_at?: string | null
          domain_id: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string
          created_at?: string | null
          domain_id?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "domain_brands_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_brands_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["id"]
          },
        ]
      }
      domains: {
        Row: {
          created_at: string | null
          description: string | null
          devurl: string | null
          favicon: string | null
          id: string
          keywords: string
          name: string
          qaurl: string | null
          status: string
          uaturl: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          devurl?: string | null
          favicon?: string | null
          id?: string
          keywords?: string
          name: string
          qaurl?: string | null
          status?: string
          uaturl?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          devurl?: string | null
          favicon?: string | null
          id?: string
          keywords?: string
          name?: string
          qaurl?: string | null
          status?: string
          uaturl?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
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
      fundraiser_surveys: {
        Row: {
          age: number | null
          auth_id: string | null
          business_name: string | null
          completed_design_percentage: number | null
          concerns_description: string | null
          created_at: string | null
          delivery_date: string | null
          funding_date: string | null
          fundraiser_id: string
          id: string
          intended_audience: string | null
          launch_date: string | null
          past_fundraising_experience: string | null
          portions_complete_description: string | null
          preferred_platform: string | null
          prelaunch_date: string | null
          questions_description: string | null
          unique_project_description: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          auth_id?: string | null
          business_name?: string | null
          completed_design_percentage?: number | null
          concerns_description?: string | null
          created_at?: string | null
          delivery_date?: string | null
          funding_date?: string | null
          fundraiser_id: string
          id?: string
          intended_audience?: string | null
          launch_date?: string | null
          past_fundraising_experience?: string | null
          portions_complete_description?: string | null
          preferred_platform?: string | null
          prelaunch_date?: string | null
          questions_description?: string | null
          unique_project_description?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          auth_id?: string | null
          business_name?: string | null
          completed_design_percentage?: number | null
          concerns_description?: string | null
          created_at?: string | null
          delivery_date?: string | null
          funding_date?: string | null
          fundraiser_id?: string
          id?: string
          intended_audience?: string | null
          launch_date?: string | null
          past_fundraising_experience?: string | null
          portions_complete_description?: string | null
          preferred_platform?: string | null
          prelaunch_date?: string | null
          questions_description?: string | null
          unique_project_description?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fundraiser_surveys_fundraiser_id_fkey"
            columns: ["fundraiser_id"]
            isOneToOne: true
            referencedRelation: "fundraisers"
            referencedColumns: ["id"]
          },
        ]
      }
      fundraisers: {
        Row: {
          auth_id: string
          budget: number | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string
          budget?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string
          budget?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
      game_system_types: {
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
      game_systems: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo_image_url: string | null
          map_icon_url: string | null
          name: string
          order: number | null
          status: string | null
          type: string | null
          type_id: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo_image_url?: string | null
          map_icon_url?: string | null
          name: string
          order?: number | null
          status?: string | null
          type?: string | null
          type_id?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo_image_url?: string | null
          map_icon_url?: string | null
          name?: string
          order?: number | null
          status?: string | null
          type?: string | null
          type_id?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_systems_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "game_system_types"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_surveys: {
        Row: {
          annual_revenue: number | null
          auth_id: string
          business_description: string | null
          business_name: string | null
          competitive_advantage: string | null
          created_at: string | null
          current_investors: string | null
          exit_strategy: string | null
          financial_projections: string | null
          funding_amount: number | null
          funding_purpose: string | null
          id: string
          intellectual_property: string | null
          market_size: string | null
          preferred_investment_type: string | null
          risks_and_challenges: string | null
          team_description: string | null
          updated_at: string | null
          use_of_funds: string | null
          years_in_business: number | null
        }
        Insert: {
          annual_revenue?: number | null
          auth_id?: string
          business_description?: string | null
          business_name?: string | null
          competitive_advantage?: string | null
          created_at?: string | null
          current_investors?: string | null
          exit_strategy?: string | null
          financial_projections?: string | null
          funding_amount?: number | null
          funding_purpose?: string | null
          id?: string
          intellectual_property?: string | null
          market_size?: string | null
          preferred_investment_type?: string | null
          risks_and_challenges?: string | null
          team_description?: string | null
          updated_at?: string | null
          use_of_funds?: string | null
          years_in_business?: number | null
        }
        Update: {
          annual_revenue?: number | null
          auth_id?: string
          business_description?: string | null
          business_name?: string | null
          competitive_advantage?: string | null
          created_at?: string | null
          current_investors?: string | null
          exit_strategy?: string | null
          financial_projections?: string | null
          funding_amount?: number | null
          funding_purpose?: string | null
          id?: string
          intellectual_property?: string | null
          market_size?: string | null
          preferred_investment_type?: string | null
          risks_and_challenges?: string | null
          team_description?: string | null
          updated_at?: string | null
          use_of_funds?: string | null
          years_in_business?: number | null
        }
        Relationships: []
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
      job_bid_statuses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      job_bids: {
        Row: {
          amount: number
          bidder_id: string
          created_at: string
          estimated_days: number | null
          id: string
          job_id: string
          proposal: string | null
          status_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          bidder_id: string
          created_at?: string
          estimated_days?: number | null
          id?: string
          job_id: string
          proposal?: string | null
          status_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          bidder_id?: string
          created_at?: string
          estimated_days?: number | null
          id?: string
          job_id?: string
          proposal?: string | null
          status_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "job_bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_bids_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_bids_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "job_bid_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      job_classes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      job_statuses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      job_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          budget: number | null
          class_id: string
          created_at: string
          description: string | null
          id: string
          requestor_id: string
          status_id: string
          title: string
          type_id: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          class_id: string
          created_at?: string
          description?: string | null
          id?: string
          requestor_id: string
          status_id: string
          title: string
          type_id: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          class_id?: string
          created_at?: string
          description?: string | null
          id?: string
          requestor_id?: string
          status_id?: string
          title?: string
          type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "job_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_requestor_id_fkey"
            columns: ["requestor_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "jobs_requestor_id_fkey"
            columns: ["requestor_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "job_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "job_types"
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
      metros: {
        Row: {
          created_at: string
          id: string
          name: string | null
          state: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          state?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          state?: string | null
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
          account_id?: string
          created_at?: string | null
          game_system_id: string
          id?: string
          player_id: string
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
          {
            foreignKeyName: "player_game_accounts_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_game_accounts_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
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
      player_skills: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          player_id: string | null
          rating: number
          skill_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          player_id?: string | null
          rating?: number
          skill_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          player_id?: string | null
          rating?: number
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_skills_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_skills_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
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
      referrals: {
        Row: {
          created_at: string | null
          id: string
          referral_code: string
          referrer_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referral_code: string
          referrer_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referral_code?: string
          referrer_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      retailer_brands: {
        Row: {
          brand_id: string
          created_at: string | null
          id: string
          retailer_id: string
          updated_at: string | null
        }
        Insert: {
          brand_id: string
          created_at?: string | null
          id?: string
          retailer_id: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string
          created_at?: string | null
          id?: string
          retailer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "retailer_brands_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retailer_brands_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          },
        ]
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
          country_id: string
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
          country_id?: string
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
          country_id?: string
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
            foreignKeyName: "retailers_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retailers_metro_id_fkey"
            columns: ["metro_id"]
            isOneToOne: false
            referencedRelation: "metro"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retailers_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "retailer_types"
            referencedColumns: ["id"]
          },
        ]
      }
      service_order_status_dependencies: {
        Row: {
          created_at: string
          dependent_id: string
          id: string
          precedent_id: string
          type_id: string
        }
        Insert: {
          created_at?: string
          dependent_id: string
          id?: string
          precedent_id: string
          type_id?: string
        }
        Update: {
          created_at?: string
          dependent_id?: string
          id?: string
          precedent_id?: string
          type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_order_status_dependencies_dependent_id_fkey"
            columns: ["dependent_id"]
            isOneToOne: false
            referencedRelation: "service_order_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_order_status_dependencies_precedent_id_fkey"
            columns: ["precedent_id"]
            isOneToOne: false
            referencedRelation: "service_order_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_order_status_dependencies_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "service_order_status_dependency_types"
            referencedColumns: ["id"]
          },
        ]
      }
      service_order_status_dependency_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      service_order_statuses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          percent_completed: number
          service_order_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          percent_completed?: number
          service_order_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          percent_completed?: number
          service_order_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_order_statuses_service_order_id_fkey"
            columns: ["service_order_id"]
            isOneToOne: false
            referencedRelation: "service_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      service_orders: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          end_date: string
          id: string
          job_id: string
          name: string
          provider_id: string | null
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          job_id: string
          name?: string
          provider_id?: string | null
          start_date?: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          job_id?: string
          name?: string
          provider_id?: string | null
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_orders_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_orders_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "player_earnings_metrics"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "service_orders_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "players"
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
      skill_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          type_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "skill_types"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
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
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
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
      _postgis_deprecate: {
        Args: {
          oldname: string
          newname: string
          version: string
        }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: {
          tbl: unknown
          col: string
        }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: {
          tbl: unknown
          att_name: string
          geom: unknown
          mode?: string
        }
        Returns: number
      }
      _st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      _st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_intersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      _st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      _st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: {
          geom: unknown
        }
        Returns: number
      }
      _st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      accept_job_bid: {
        Args: {
          bid_id_param: string
        }
        Returns: undefined
      }
      addauth: {
        Args: {
          "": string
        }
        Returns: boolean
      }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
      box:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box2d:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box2d_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2d_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2df_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2df_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3d:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box3d_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3d_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3dtobox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      bytea:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      calculate_distance: {
        Args: {
          lat1: number
          lng1: number
          lat2: number
          lng2: number
        }
        Returns: number
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
            }
            Returns: string
          }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
            }
            Returns: string
          }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geography:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      geography_analyze: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      geography_typmod_out: {
        Args: {
          "": number
        }
        Returns: unknown
      }
      geometry:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      geometry_above: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_analyze: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      geometry_below: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_cmp: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_contained_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_eq: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_ge: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      geometry_gt: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_hash: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      geometry_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_le: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_left: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_lt: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_overabove: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overleft: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overright: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_right: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_same: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      geometry_sortsupport: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      geometry_typmod_out: {
        Args: {
          "": number
        }
        Returns: unknown
      }
      geometry_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometrytype:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      geomfromewkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      geomfromewkt: {
        Args: {
          "": string
        }
        Returns: unknown
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
      get_proj4_from_srid: {
        Args: {
          "": number
        }
        Returns: string
      }
      get_schema_cards: {
        Args: {
          p_schema_name: string
        }
        Returns: Json[]
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gidx_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      import_countries_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_campaign_owner: {
        Args: {
          campaign_id: string
          checking_user_id: string
        }
        Returns: boolean
      }
      json: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      jsonb: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      point: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      polygon: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      populate_geometry_columns:
        | {
            Args: {
              tbl_oid: unknown
              use_typmod?: boolean
            }
            Returns: number
          }
        | {
            Args: {
              use_typmod?: boolean
            }
            Returns: string
          }
      postgis_addbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: number
      }
      postgis_constraint_type: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: string
      }
      postgis_dropbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: {
          "": number
        }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: {
          "": number
        }
        Returns: number
      }
      postgis_typmod_type: {
        Args: {
          "": number
        }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      schema_exists: {
        Args: {
          p_schema_name: string
        }
        Returns: boolean
      }
      spheroid_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      spheroid_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3ddistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_3dlength: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_3dlongestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_3dperimeter: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_3dshortestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_addpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_angle:
        | {
            Args: {
              line1: unknown
              line2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              pt1: unknown
              pt2: unknown
              pt3: unknown
              pt4?: unknown
            }
            Returns: number
          }
      st_area:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_area2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_asbinary:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_asencodedpolyline: {
        Args: {
          geom: unknown
          nprecision?: number
        }
        Returns: string
      }
      st_asewkb: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_asewkt:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_asgeojson:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
            Returns: string
          }
      st_asgml:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
      st_ashexewkb: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_askml:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              nprefix?: string
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              nprefix?: string
            }
            Returns: string
          }
      st_aslatlontext: {
        Args: {
          geom: unknown
          tmpl?: string
        }
        Returns: string
      }
      st_asmarc21: {
        Args: {
          geom: unknown
          format?: string
        }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              rel?: number
              maxdecimaldigits?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              rel?: number
              maxdecimaldigits?: number
            }
            Returns: string
          }
      st_astext:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_astwkb:
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: {
          geom: unknown
          maxdecimaldigits?: number
          options?: number
        }
        Returns: string
      }
      st_azimuth:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
      st_boundary: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: {
          geom: unknown
          fits?: boolean
        }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: {
              geom: unknown
              radius: number
              options?: string
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              radius: number
              quadsegs: number
            }
            Returns: unknown
          }
      st_buildarea: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_centroid:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      st_cleangeometry: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: {
          geom: unknown
          box: unknown
        }
        Returns: unknown
      }
      st_closestpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: {
          "": unknown[]
        }
        Returns: unknown[]
      }
      st_collect:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
      st_collectionextract: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_convexhull: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_coorddim: {
        Args: {
          geometry: unknown
        }
        Returns: number
      }
      st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_curvetoline: {
        Args: {
          geom: unknown
          tol?: number
          toltype?: number
          flags?: number
        }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: {
          g1: unknown
          tolerance?: number
          flags?: number
        }
        Returns: unknown
      }
      st_difference: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_dimension: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_disjoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_distance:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
      st_distancesphere:
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
              radius: number
            }
            Returns: number
          }
      st_distancespheroid: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_dump: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_envelope: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_expand:
        | {
            Args: {
              box: unknown
              dx: number
              dy: number
            }
            Returns: unknown
          }
        | {
            Args: {
              box: unknown
              dx: number
              dy: number
              dz?: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              dx: number
              dy: number
              dz?: number
              dm?: number
            }
            Returns: unknown
          }
      st_exteriorring: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_force2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_force3d: {
        Args: {
          geom: unknown
          zvalue?: number
        }
        Returns: unknown
      }
      st_force3dm: {
        Args: {
          geom: unknown
          mvalue?: number
        }
        Returns: unknown
      }
      st_force3dz: {
        Args: {
          geom: unknown
          zvalue?: number
        }
        Returns: unknown
      }
      st_force4d: {
        Args: {
          geom: unknown
          zvalue?: number
          mvalue?: number
        }
        Returns: unknown
      }
      st_forcecollection: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcecurve: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcerhr: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcesfs: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_generatepoints:
        | {
            Args: {
              area: unknown
              npoints: number
            }
            Returns: unknown
          }
        | {
            Args: {
              area: unknown
              npoints: number
              seed: number
            }
            Returns: unknown
          }
      st_geogfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geohash:
        | {
            Args: {
              geog: unknown
              maxchars?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxchars?: number
            }
            Returns: string
          }
      st_geomcollfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geometrytype: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_geomfromewkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromgeojson:
        | {
            Args: {
              "": Json
            }
            Returns: unknown
          }
        | {
            Args: {
              "": Json
            }
            Returns: unknown
          }
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
      st_geomfromgml: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: {
          marc21xml: string
        }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_gmltosql: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_hasarc: {
        Args: {
          geometry: unknown
        }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_hexagon: {
        Args: {
          size: number
          cell_i: number
          cell_j: number
          origin?: unknown
        }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: {
          size: number
          bounds: unknown
        }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: {
          line: unknown
          point: unknown
        }
        Returns: number
      }
      st_intersection: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_intersects:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_isclosed: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_iscollection: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isempty: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isring: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_issimple: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isvalid: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: {
          geom: unknown
          flags?: number
        }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_length:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_length2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_letters: {
        Args: {
          letters: string
          font?: Json
        }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: {
          txtin: string
          nprecision?: number
        }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_linefromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_linemerge: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linetocurve: {
        Args: {
          geometry: unknown
        }
        Returns: unknown
      }
      st_locatealong: {
        Args: {
          geometry: unknown
          measure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: {
          geometry: unknown
          fromelevation: number
          toelevation: number
        }
        Returns: unknown
      }
      st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_m: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_makebox2d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_makeline:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
      st_makepolygon: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_makevalid:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              params: string
            }
            Returns: unknown
          }
      st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: {
          "": unknown
        }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: {
          inputgeom: unknown
          segs_per_quarter?: number
        }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: {
          "": unknown
        }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multi: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_ndims: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_node: {
        Args: {
          g: unknown
        }
        Returns: unknown
      }
      st_normalize: {
        Args: {
          geom: unknown
        }
        Returns: unknown
      }
      st_npoints: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_nrings: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numgeometries: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numinteriorring: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numinteriorrings: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numpatches: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numpoints: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_offsetcurve: {
        Args: {
          line: unknown
          distance: number
          params?: string
        }
        Returns: unknown
      }
      st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_perimeter:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_perimeter2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_pointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_points: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonize: {
        Args: {
          "": unknown[]
        }
        Returns: unknown
      }
      st_project: {
        Args: {
          geog: unknown
          distance: number
          azimuth: number
        }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: {
          geom: unknown
          gridsize: number
        }
        Returns: unknown
      }
      st_relate: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: {
          geom: unknown
          tolerance?: number
        }
        Returns: unknown
      }
      st_reverse: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_segmentize: {
        Args: {
          geog: unknown
          max_segment_length: number
        }
        Returns: unknown
      }
      st_setsrid:
        | {
            Args: {
              geog: unknown
              srid: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              srid: number
            }
            Returns: unknown
          }
      st_sharedpaths: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_shortestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: {
          geom: unknown
          vertex_fraction: number
          is_outer?: boolean
        }
        Returns: unknown
      }
      st_split: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_square: {
        Args: {
          size: number
          cell_i: number
          cell_j: number
          origin?: unknown
        }
        Returns: unknown
      }
      st_squaregrid: {
        Args: {
          size: number
          bounds: unknown
        }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | {
            Args: {
              geog: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom: unknown
            }
            Returns: number
          }
      st_startpoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_subdivide: {
        Args: {
          geom: unknown
          maxvertices?: number
          gridsize?: number
        }
        Returns: unknown[]
      }
      st_summary:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_swapordinates: {
        Args: {
          geom: unknown
          ords: unknown
        }
        Returns: unknown
      }
      st_symdifference: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_transform:
        | {
            Args: {
              geom: unknown
              from_proj: string
              to_proj: string
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              from_proj: string
              to_srid: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              to_proj: string
            }
            Returns: unknown
          }
      st_triangulatepolygon: {
        Args: {
          g1: unknown
        }
        Returns: unknown
      }
      st_union:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
              gridsize: number
            }
            Returns: unknown
          }
      st_voronoilines: {
        Args: {
          g1: unknown
          tolerance?: number
          extend_to?: unknown
        }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: {
          g1: unknown
          tolerance?: number
          extend_to?: unknown
        }
        Returns: unknown
      }
      st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: {
          wkb: string
        }
        Returns: unknown
      }
      st_wkttosql: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_wrapx: {
        Args: {
          geom: unknown
          wrap: number
          move: number
        }
        Returns: unknown
      }
      st_x: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_xmax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_xmin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_y: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_ymax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_ymin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_z: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmflag: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      text: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      unlockrows: {
        Args: {
          "": string
        }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
    }
    Enums: {
      ad_platform_type:
        | "google_adwords"
        | "facebook"
        | "tiktok"
        | "reddit"
        | "x_twitter"
        | "radio"
        | "billboard"
        | "email"
      book_size: "8.5x11" | "6x9"
      metro_status: "active" | "inactive"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
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

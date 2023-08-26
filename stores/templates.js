import { defineStore } from 'pinia'

const supabase = useSupabase().value

export const useTemplatesStore = defineStore('templates', {
  state: () => ({
    templates: [],
    currentTemplate: null
  }),
  getters: {
    galleries() {
      return this.templates.filter(item => item.public == true);
    }
  },
  actions: {
    async fetchTemplates() {
      const { data, error } =  await supabase
                                      .from('templates')
                                      .select()

      if (!error) {
        this.templates = data
      }
    },

    async fetchTemplate(id) {
      const { data, error } = await supabase
        .from('templates')
        .select()
        .eq('id', id)

      if (!error) {
        this.currentTemplate = data[0]
      }
    },

    async updateTemplate(id, name) {
      const { data, error } = await supabase
        .from('templates')
        .update({ name: name })
        .eq('id', id)
        .select()

      if (!error) {
        this.currentTemplate = data[0]
      }
    },

    async createTemplate(info) {
      const { data, error } = await supabase
              .from('templates')
              .insert({ name: info.name, description: info.description })
              .select()

      if (!error) {
        this.currentTemplate = data[0]
      }

      return data[0]
    }
  }
})
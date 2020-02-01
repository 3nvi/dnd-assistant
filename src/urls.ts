const urls = {
  campaigns: {
    new: () => `/campaigns/new/`,
    list: () => `/campaigns/`,
    get: (id: string) => `/campaigns/${id}/`,
    edit: (id: string) => `/campaigns/${id}/edit`,
  },
};

export default urls;

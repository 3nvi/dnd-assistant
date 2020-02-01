const urls = {
  campaigns: {
    new: () => `/campaigns/new/`,
    list: () => `/campaigns/`,
    get: (id: string) => `/campaigns/${id}/`,
    update: (id: string) => `/campaigns/${id}/edit/`,
  },
};

export default urls;

export type article = {
  id: number;
  name: string;
  surname: string;
  email: string;
  date: string; //dovrá essere date
  title: string;
  status: string;
  coverContent: string;
  category: Array<any>;
  content: Array<contentArticle>;
};

export type articlePage = {
  paginationArticle: Array<Array<article>>;
  pages: number;
};

export type content = {
  paragraph: string;
  mediaContent: string | null;
  mediaType: string | null;
};
export type contentArticle = {
  paragraph: string;
  media: {
    content: string;
    type: string;
  }[];
};

export type category = {
  label: string;
  value: number;
};

export type infoType = {
  info: {
    title: string;
    text: string;
  };
  qna: Array<faq>;
} | null;

export type faq = {
  question: string;
  answer: string;
};

export type events = {
  id: number;
  attendants: Array<any>;
  title: string;
  coverContent: string;
  description: string;
  requirements: string;
  eventDate: string;
  place: string;
};

export type personalData = {
  info: personalInfo;
  donations: donationData;
  events: Array<events>;
} | null;

export type donation = {
  userId: string;
  name: string;
  surname: string;
  donationDate: string;
  amount: number;
};

export type donationData = {
  totalAmount: number;
  history: donation[];
};

export type personalInfo = {
  email: string;
  language: string;
  name: string;
  password: string;
  phone: string;
  surname: string;
  id?: number;
};

export type language = {
  label: string;
  value: string;
};

export type sendObj = {
  id?: number | undefined;
  language?: string;
  name?: string;
  password?: string;
  surname?: string;
  phone?: string;
};

export type hero = {
  mediaContent: string;
  text: string;
};

export type social = {
  name: string;
  iconContent: string;
  link: string;
  footerOn: boolean;
  homepageOn: boolean;
};

export type contact = {
  site: string;
  email: string;
  address: string;
  vatNumber: string;
  fiscalCode: string;
};

export type color = {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
};

export type joinUs = {
  title: string;
  subtitle: string;
  btnText1: string;
  btnText2: string;
  link: string;
};

export type support = {
  hero: hero;
  title: {
    id: number;
    title: string;
  };
  content: Array<content>;
};

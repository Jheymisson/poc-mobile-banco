declare type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

declare type UserSupport = {
  url: string;
  text: string;
};

declare type UserList = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  support: UserSupport;
  data: UserData[];
};

declare type MongoCode = {
  code: string;
};

declare type DriverIO = {
  $: driver.$;
  $$: driver.$$;
};

declare type E = WebdriverIO.Element;

declare type EA = WebdriverIO.ElementArray;

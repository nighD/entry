export interface QueryParams {
  short_title: string;
  status: string;
}

interface ProgramProps {
  id: string;
  display_title: string;
  thumbnail_img_url: string;
  short_title: string;
}

export interface SessionResponse {
  id: string;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  program: ProgramProps[];
}

export interface OptionProp {
  value: string;
  label: string;
}

export const statusFilter: OptionProp[] = [
  {
    label: "OFFERING",
    value: "offering"
  },
  {
    label: "RUNNING",
    value: "running"
  },
  {
    label: "OFFBOARDING",
    value: "offboarding"
  }
];
export const shortTitleFilter: OptionProp[] = [
  {
    label: "VC",
    value: "vc"
  },
  {
    label: "Product",
    value: "product"
  },
  {
    label: "Data",
    value: "data"
  },
  {
    label: "Data2",
    value: "data2"
  },
  {
    label: "Data3",
    value: "data3"
  },
  {
    label: "Scrum",
    value: "scrum"
  },
  {
    label: "Product2",
    value: "product2"
  },
  {
    label: "Product3",
    value: "product3"
  },
  {
    label: "Growth",
    value: "growth"
  }
];
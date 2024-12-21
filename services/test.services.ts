import type { AxiosResponse } from "axios";
import type { SightTest } from "~/types/eyeTest.type";
import { API } from "~/utils/api.utils";

export const TestServices = {
  fetchSightTestData: (
    packNumber: number
  ): Promise<AxiosResponse<SightTest[]>> => {
    return API().get<SightTest[]>(`/pack${packNumber}`);
  },
};

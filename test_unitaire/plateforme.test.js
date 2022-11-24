import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import axios from "axios";
import Plateformes from "../src/views/Plateformes.vue";
import store from "../src/store/index";
import { initMockAxios } from "./tools";

jest.mock("axios");

describe("Plateformes", () => {
  it("test on the get", async () => {
    initMockAxios();

    const wrapper = shallowMount(Plateformes, { store });
    await nextTick();

    expect(axios.get).toHaveBeenCalledTimes(4);
    expect(axios.get).toHaveBeenNthCalledWith(1, "/plateforme/");
    expect(axios.get).toHaveBeenNthCalledWith(2, "/plateforme/nombre/");
    expect(axios.get).toHaveBeenNthCalledWith(3, "/exploitant/");
    expect(axios.get).toHaveBeenNthCalledWith(4, "/type_projet_territorial/");

    await nextTick();

    expect(wrapper.find(".page > .titre").text()).toBe("Plateformes");
    expect(wrapper.find(".nbre").text()).toBe("Vous avez 5 plateformes.");

    const headers = wrapper.find(".tab > v-data-table-stub").props("headers");
    const plateforme = wrapper.find(".tab > v-data-table-stub").props("items");
    expect(headers.length).toStrictEqual(6);
    expect(headers[0]).toStrictEqual({
      text: "Type de projet",
      value: "lib_type_projet_territorial",
      class: "header_color",
    });

    expect(plateforme.length).toStrictEqual(5); // how many items dataGet (tool.js)
    expect(plateforme[0].lib_plateforme_long).toStrictEqual("pla 1");
    expect(plateforme[1].lib_type_projet_territorial).toStrictEqual(
      "projet_ent"
    );
    expect(plateforme[2].etat).toStrictEqual(1);
    expect(plateforme[3].lib_exploitant_long).toStrictEqual("exp 4");
  });
});

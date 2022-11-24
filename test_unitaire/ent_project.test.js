import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import axios from "axios";
import Ent_projects from "../src/views/Ent_projects";
import store from "../src/store/index";
import { initMockAxios } from "./tools";

jest.mock("axios");

describe("Ent_projects", () => {
  it("test on the get", async () => {
    initMockAxios();

    const wrapper = shallowMount(Ent_projects, { store });
    await nextTick();

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenNthCalledWith(1, "/projet/ent/");
    expect(axios.get).toHaveBeenNthCalledWith(2, "/projet/ent/nombre/");

    await nextTick();
    // console.log(wrapper.html())
    expect(wrapper.find(".page > .titre").text()).toBe("Projets ENT");
    expect(wrapper.find(".nbre").text()).toBe("Vous avez 123 projets ENT.");
    const headers = wrapper.find(".tab > v-data-table-stub").props("headers");
    const projets_ent = wrapper.find(".tab > v-data-table-stub").props("items");
    expect(headers.length).toStrictEqual(4);
    expect(headers[0]).toStrictEqual({
      class: "header_color",
      text: "Libellé long",
      value: "lib_projet_territorial_uai_long",
    });
    expect(projets_ent.length).toStrictEqual(4);
    expect(projets_ent[0].lib_projet_territorial_uai_long).toStrictEqual(
      "Projet ent 1"
    );
    expect(projets_ent[1].lib_projet_territorial_uai_court).toStrictEqual(
      "projet ent 2"
    );
    expect(projets_ent[2].id_type_projet_territorial).toStrictEqual(3);
  });
});

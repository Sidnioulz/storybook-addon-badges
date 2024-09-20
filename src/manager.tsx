import { addons, useStorybookApi, types } from "@storybook/manager-api";
import type { API_SidebarOptions } from "@storybook/types";
import React from 'react';
import { ADDON_ID, ADDON_TITLE, PARAM_BADGES_KEY, TOOL_ID } from "./constants";
import { BadgesToolbar } from "./components";
import { Tool } from "./Tool";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    paramKey: PARAM_BADGES_KEY,
    title: ADDON_TITLE,
    match: () => true,
    render: Tool,
  });
});

export const sidebar: API_SidebarOptions = {
  renderLabel: (item) => {
    if (item.type !== 'story' && item.type !== 'docs') {
      return;
    }

    const api = useStorybookApi();
    const params = api.getParameters(item.id);

    if (!params || !params.badges || params.badges.length === 0) {
      return;
    }

    return <>{item.title}<BadgesToolbar badges={params.badges}/></>
  },
};

addons.setConfig({
  sidebar,
});

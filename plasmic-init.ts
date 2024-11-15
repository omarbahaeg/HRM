import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { VSHTable } from "./components/vsh-table/VSHTable";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "qFgf32neWRE8gRveVBaatz",
      token: "yDn38kaaXqln3Nv4LPK7k2R9CefTDbkFHl6PDJNQ99AjvjXsVGNs4YePBOtpExoWREgUqr6BcyUVA6dnKXPQ"
    }
  ],
  preview: true
});


PLASMIC.registerComponent(VSHTable, {
  name: "VSHTable",
  props: {
    data: {
      type: "dataSourceOpData",
      displayName: "Data",
      defaultValue: [],
      dataSourceConfig: {
        name: "Current VSHTable Data",
        displayName: "Current VSHTable Data",
        value: (props: any) => {
          const responseData = props.data?.response || props.data;
          return Array.isArray(responseData) ? responseData : [];
        },
        options: (props: any) => {
          const data = props.data?.response || props.data || [];
          if (data.length === 0) return [];

          return [{
            value: "currentData",
            label: "Current VSHTable Data",
            data: data
          }];
        }
      },
      onChange: (newData: any, ctx: any) => {
        if (!newData || !ctx?.updateProps) return;
        
        const responseData = newData?.response || newData;
        const data = Array.isArray(responseData) ? responseData : [];
        
        if (data.length === 0) return;

        const firstItem = data[0];
        const columnOptions = Object.keys(firstItem).map(key => ({
          value: key,
          label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
        }));

        ctx.updateProps({
          data: data,
          columnOptions: columnOptions
        });
      }
    },
    columns: {
      type: "array",
      displayName: "Columns",
      defaultValue: [],
      itemType: {
        type: "object",
        fields: {
          title: {
            type: "string",
            displayName: "Header Title",
            defaultValue: ""
          },
          accessorKey: {
            type: "choice",
            displayName: "Data Field",
            options: (props) => {
              const data = props.data?.response || props.data || [];
              if (data.length === 0) return [];
              
              const firstItem = data[0];
              return Object.keys(firstItem).map(key => ({
                value: key,
                label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
              }));
            }
          },
          dataType: {
            type: "choice",
            displayName: "Data Type",
            options: [
              { label: "Text", value: "text" },
              { label: "Number", value: "number" },
              { label: "Date", value: "date" },
              { label: "Image", value: "image" },
              { label: "Imagebox", value: "imagebox" },
              { label: "Badge", value: "badge" },
              { label: "Progress", value: "progress" }
            ],
            defaultValue: "text",
            description: "Choose the type of data in this column"
          },
          imageboxConfig: {
            type: "object",
            displayName: "Imagebox Config",
            fields: {
              avatarField: {
                type: "choice",
                displayName: "Avatar Field",
                options: (props) => {
                  const data = props.data?.response || props.data || [];
                  if (data.length === 0) return [];
                  
                  const firstItem = data[0];
                  return Object.keys(firstItem).map(key => ({
                    value: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
                  }));
                }
              },
              labelField: {
                type: "choice",
                displayName: "Label Field",
                options: (props) => {
                  const data = props.data?.response || props.data || [];
                  if (data.length === 0) return [];
                  
                  const firstItem = data[0];
                  return Object.keys(firstItem).map(key => ({
                    value: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
                  }));
                }
              },
              sublabelField: {
                type: "choice",
                displayName: "Sublabel Field",
                options: (props) => {
                  const data = props.data?.response || props.data || [];
                  if (data.length === 0) return [];
                  
                  const firstItem = data[0];
                  return Object.keys(firstItem).map(key => ({
                    value: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
                  }));
                }
              }
            }
          },
          badgeConfig: {
            type: "object",
            displayName: "Badge Config",
            fields: {
              rules: {
                type: "array",
                displayName: "Rules",
                itemType: {
                  type: "object",
                  fields: {
                    condition: {
                      type: "string",
                      displayName: "Text",
                      description: "Badge will use this color when cell text matches this value"
                    },
                    color: {
                      type: "choice",
                      displayName: "Color",
                      options: [
                        "blue", "red", "#006e28", "yellow", "purple", "gray",
                        "dark", "pink", "orange", "teal", "cyan", "indigo"
                      ]
                    }
                  }
                }
              }
            }
          },
          progressConfig: {
            type: "object",
            displayName: "Progress Config",
            fields: {
              ranges: {
                type: "array",
                displayName: "Progress Ranges",
                itemType: {
                  type: "object",
                  fields: {
                    value: {
                      type: "number",
                      displayName: "Value",
                      defaultValue: 0,
                      min: 0,
                      max: 100
                    },
                    color: {
                      type: "choice",
                      displayName: "Color",
                      options: [
                        "blue",
                        "red",
                        "#006e28",
                        "yellow",
                        "purple",
                        "gray",
                        "dark",
                        "pink",
                        "orange",
                        "teal",
                        "cyan",
                        "indigo"
                      ],
                      defaultValue: "#006e28"
                    }
                  }
                }
              }
            }
          },
          dateConfig: {
            type: "object",
            displayName: "Date Config",
            fields: {
              formatType: {
                type: "choice",
                displayName: "Format Type",
                options: [
                  { label: "Date/Time", value: "datetime" },
                  { label: "Date/Time relative to now", value: "relative" }
                ],
                defaultValue: "datetime"
              },
              dateStyle: {
                type: "choice",
                displayName: "Date Style",
                options: [
                  { label: "None (don't display date)", value: "none" },
                  { label: "Short (like 12/25/2023)", value: "short" },
                  { label: "Medium (like Dec 25, 2023)", value: "medium" },
                  { label: "Long (like December 25, 2023)", value: "long" },
                  { label: "Full (like Monday, December 25, 2023)", value: "full" }
                ],
                defaultValue: "short"
              },
              timeStyle: {
                type: "choice",
                displayName: "Time Style",
                options: [
                  { label: "None (don't display time)", value: "none" },
                  { label: "Short (like 4:00 PM)", value: "short" },
                  { label: "Medium (like 4:00:00 PM)", value: "medium" },
                  { label: "Long (like 4:00:00 PM PST)", value: "long" },
                  { label: "Full (like 4:00:00 PM Pacific Standard Time)", value: "full" }
                ],
                defaultValue: "short"
              },
              useAMPM: {
                type: "boolean",
                displayName: "Use AM/PM?",
                defaultValue: true
              },
              useNumbers: {
                type: "choice",
                displayName: "Use Numbers?",
                options: [
                  { label: "Always use numbers", value: "always" },
                  { label: "Use words like 'Yesterday' or 'Tomorrow'", value: "words" }
                ],
                defaultValue: "always"
              },
              timeUnit: {
                type: "choice",
                displayName: "Time Unit",
                options: [
                  "Seconds",
                  "Minutes",
                  "Hours",
                  "Days",
                  "Weeks",
                  "Months",
                  "Years"
                ],
                defaultValue: "Days"
              }
            }
          },
          filterVariant: {
            type: "choice",
            displayName: "Filter Type",
            options: [
              { label: "Text", value: "text" },
              { label: "Select", value: "select" },
              { label: "Multi Select", value: "multi-select" },
              { label: "Range", value: "range" },
              { label: "Range Slider", value: "range-slider" },
              { label: "Date", value: "date" },
              { label: "Date Range", value: "date-range" },
              { label: "Boolean", value: "boolean" },
              { label: "Checkbox", value: "checkbox" },
              { label: "Auto Complete", value: "autocomplete" }
            ],
            defaultValue: "text",
            description: "Choose how to filter this column"
          },
          filterConfig: {
            type: "object",
            displayName: "Filter Configuration",
            fields: {
              selectOptions: {
                type: "array",
                displayName: "Select Options",
                itemType: {
                  type: "object",
                  fields: {
                    label: {
                      type: "string",
                      displayName: "Label"
                    },
                    value: {
                      type: "string",
                      displayName: "Value"
                    }
                  }
                }
              },
              rangeConfig: {
                type: "object",
                displayName: "Range Configuration",
                fields: {
                  min: {
                    type: "number",
                    displayName: "Minimum Value"
                  },
                  max: {
                    type: "number",
                    displayName: "Maximum Value"
                  },
                  step: {
                    type: "number",
                    displayName: "Step Size",
                    defaultValue: 1
                  }
                }
              },
              dateConfig: {
                type: "object",
                displayName: "Date Configuration",
                fields: {
                  minDate: {
                    type: "date",
                    displayName: "Minimum Date"
                  },
                  maxDate: {
                    type: "date",
                    displayName: "Maximum Date"
                  },
                  format: {
                    type: "string",
                    displayName: "Date Format",
                    defaultValue: "YYYY-MM-DD"
                  }
                }
              }
            }
          },
          size: {
            type: "number",
            displayName: "Column Width",
            defaultValue: 200
          },
          enableResizing: {
            type: "boolean",
            displayName: "Enable Resizing",
            defaultValue: true
          },
          enableSorting: {
            type: "boolean",
            displayName: "Enable Sorting",
            defaultValue: true
          },
          enableClickToCopy: {
            type: "boolean",
            displayName: "Enable Click to Copy",
            defaultValue: false
          },
          enableEditing: {
            type: "boolean",
            displayName: "Enable Editing",
            defaultValue: false
          },
          isHidden: {
            type: "boolean",
            displayName: "Is Hidden",
            defaultValue: false
          }
        }
      }
    },
    tableLayout: {
      type: "object",
      displayName: "Table Layout",
      fields: {
        header: {
          type: "boolean",
          displayName: "Header",
          defaultValue: true
        },
        headerLeftSection: {
          type: "boolean",
          displayName: "Header Left Section",
          defaultValue: true
        },
        headerRightSection: {
          type: "boolean",
          displayName: "Header Right Section",
          defaultValue: true
        },
        footer: {
          type: "boolean",
          displayName: "Footer",
          defaultValue: true
        },
        footerLeftSection: {
          type: "boolean",
          displayName: "Footer Left Section",
          defaultValue: true
        },
        footerRightSection: {
          type: "boolean",
          displayName: "Footer Right Section",
          defaultValue: true
        },
        exportConfig: {
          type: "object",
          displayName: "Export Data Config",
          fields: {
            gap: {
              type: "number",
              displayName: "Gap",
              defaultValue: 8,
              description: "Space between export buttons"
            },
            exportAllData: {
              type: "boolean",
              displayName: "Export All Data",
              defaultValue: true
            },
            selectedRows: {
              type: "boolean",
              displayName: "Selected Rows",
              defaultValue: true
            },
            exportTypes: {
              type: "choice",
              displayName: "Export Types",
              choice: "multi",
              options: [
                { label: "PDF", value: "pdf" },
                { label: "Excel", value: "excel" },
                { label: "CSV", value: "csv" },
                { label: "JSON", value: "json" },
                { label: "JPG", value: "jpg" },
                { label: "PNG", value: "png" }
              ],
              defaultValue: ["pdf", "excel", "csv", "json"],
              multiSelect: true
            }
          }
        },
        topbarConfig: {
          type: "object",
          displayName: "Topbar Config",
          fields: {
            gap: {
              type: "number",
              displayName: "Gap",
              defaultValue: 8
            },
            searchPlaceholder: {
              type: "string",
              displayName: "Search Placeholder",
              defaultValue: "Search..."
            },
            searchToggle: {
              type: "boolean",
              displayName: "Search Toggle",
              defaultValue: true
            },
            filterToggle: {
              type: "boolean",
              displayName: "Filter Toggle",
              defaultValue: true
            },
            columnVisibility: {
              type: "boolean",
              displayName: "Column Visibility",
              defaultValue: true
            },
            densityToggle: {
              type: "boolean",
              displayName: "Density Toggle",
              defaultValue: true
            },
            fullScreenToggle: {
              type: "boolean",
              displayName: "Full Screen Toggle",
              defaultValue: true
            },
            searchToggleVisibility: {
              type: "boolean",
              displayName: "Search Toggle Visibility",
              defaultValue: true
            },
            filterToggleVisibility: {
              type: "boolean",
              displayName: "Filter Toggle Visibility",
              defaultValue: true
            },
            filterType: {
              type: "choice",
              displayName: "Filter Type",
              options: ["Default", "Popover"],
              defaultValue: "Default"
            },
            densityType: {
              type: "choice",
              displayName: "Density Type",
              options: ["Small", "Medium", "Large"],
              defaultValue: "Medium"
            }
          }
        }
      }
    },
    bodyLayout: {
      type: "object",
      displayName: "Body Layout",
      defaultValue: {
        selected: true,
        expand: true,
        actions: true,
        actionType: "More",
        actionMoreConfig: {
          iconType: "Vertical"
        }
      },
      fields: {
        selected: {
          type: "boolean",
          displayName: "Selected",
          defaultValue: true
        },
        expand: {
          type: "boolean",
          displayName: "Expand",
          defaultValue: true
        },
        actions: {
          type: "boolean",
          displayName: "Actions",
          defaultValue: true
        },
        actionType: {
          type: "choice",
          displayName: "Action Type",
          options: ["More", "Icons"],
          defaultValue: "More"
        },
        actionMoreConfig: {
          type: "object",
          displayName: "Action More Config",
          fields: {
            iconType: {
              type: "choice",
              displayName: "Icon Type",
              options: ["Vertical", "Horizontal"],
              defaultValue: "Vertical"
            },
            menuItems: {
              type: "array",
              displayName: "Menu Items",
              itemType: {
                type: "object",
                fields: {
                  label: {
                    type: "string",
                    displayName: "Label"
                  },
                  icon: {
                    type: "string",
                    displayName: "Icon"
                  },
                  action: {
                    type: "string",
                    displayName: "Action"
                  }
                }
              }
            }
          }
        },
        actionIconsConfig: {
          type: "object",
          displayName: "Action Icons Config",
          fields: {
            gap: {
              type: "number",
              displayName: "Gap",
              defaultValue: 8
            },
            icons: {
              type: "array",
              displayName: "Icons",
              itemType: {
                type: "object",
                fields: {
                  icon: {
                    type: "string",
                    displayName: "Icon"
                  },
                  action: {
                    type: "string",
                    displayName: "Action"
                  }
                }
              }
            }
          }
        }
      }
    },
    tableOptions: {
      type: "object",
      displayName: "Table Options",
      defaultValue: {
        selected: true,
        expand: true,
        actions: true,
        rowHover: true,
        rowBorder: true,
        columnDragging: true,
        columnResizing: true
      },
      fields: {
        selected: {
          type: "boolean",
          displayName: "Enable Selection",
          defaultValue: true
        },
        expand: {
          type: "boolean",
          displayName: "Enable Expand",
          defaultValue: true
        },
        actions: {
          type: "boolean",
          displayName: "Enable Actions",
          defaultValue: true
        },
        rowHover: {
          type: "boolean",
          displayName: "Row Hover",
          defaultValue: true
        },
        rowNumbers: {
          type: "boolean",
          displayName: "Row Numbers",
          defaultValue: false
        },
        tableBorder: {
          type: "boolean",
          displayName: "Table Border",
          defaultValue: false
        },
        columnBorder: {
          type: "boolean",
          displayName: "Column Border",
          defaultValue: true
        },
        rowBorder: {
          type: "boolean",
          displayName: "Row Border",
          defaultValue: true
        },
        stripesRow: {
          type: "boolean",
          displayName: "Stripes Row",
          defaultValue: false
        },
        rowDragging: {
          type: "boolean",
          displayName: "Row Dragging",
          defaultValue: false
        },
        columnDragging: {
          type: "boolean",
          displayName: "Column Dragging",
          defaultValue: true
        },
        rowResizing: {
          type: "boolean",
          displayName: "Row Resizing",
          defaultValue: false
        },
        columnResizing: {
          type: "boolean",
          displayName: "Column Resizing",
          defaultValue: true
        }
      }
    },
    actionsConfig: {
      type: "object",
      displayName: "Actions Configuration",
      fields: {
        actionsSize: {
          type: "number",
          displayName: "Actions Column Size",
          defaultValue: 75,
          min: 50,
          max: 200
        },
        actionType: {
          type: "choice",
          displayName: "Action Type",
          options: ["More", "Icons"],
          defaultValue: "More"
        },
        actionMoreConfig: {
          type: "object",
          displayName: "More Actions Config",
          fields: {
            iconType: {
              type: "choice",
              displayName: "Icon Type",
              options: ["Vertical", "Horizontal"],
              defaultValue: "Vertical"
            },
            menuItems: {
              type: "array",
              displayName: "Menu Items",
              itemType: {
                type: "object",
                fields: {
                  label: {
                    type: "string",
                    displayName: "Label"
                  },
                  icon: {
                    type: "string",
                    displayName: "Icon"
                  },
                  color: {
                    type: "string",
                    displayName: "Color",
                    defaultValue: "#006e28"
                  },
                  action: {
                    type: "string",
                    displayName: "Action Function Name"
                  }
                }
              }
            }
          }
        },
        actionIconsConfig: {
          type: "object",
          displayName: "Icons Actions Config",
          fields: {
            gap: {
              type: "number",
              displayName: "Gap",
              defaultValue: 8
            },
            icons: {
              type: "array",
              displayName: "Action Icons",
              itemType: {
                type: "object",
                fields: {
                  icon: {
                    type: "string",
                    displayName: "Icon"
                  },
                  color: {
                    type: "string",
                    displayName: "Color",
                    defaultValue: "#006e28"
                  },
                  action: {
                    type: "string",
                    displayName: "Action Function Name"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  importPath: "./components/vsh-table/VSHTable"
});

export function initPlasmicLoaders() {
  // Not needed
}
import { NextResponse } from "next/server";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "ClearMoney API",
    version: "1.0.0",
    description: "Internal API for ClearMoney super fund data",
  },
  paths: {
    "/api/holdings": {
      get: {
        summary: "Get holdings for a fund option",
        description:
          "Returns all holdings for a given fund and option, split into public holdings, private investments, bonds and cash.",
        parameters: [
          {
            name: "fund",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware",
          },
          {
            name: "option",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware_HighGrowth",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    public_holdings: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Holding" },
                    },
                    private_investments: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Holding" },
                    },
                    bonds: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Holding" },
                    },
                    cash: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Holding" },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Missing fund or option parameter" },
          500: { description: "Database fetch failed" },
        },
      },
    },
    "/api/MySuper": {
      get: {
        summary: "Get MySuper default option for a fund",
        description:
          "Returns the MySuper default option (id, option_name, as_of_date) for a given fund.",
        parameters: [
          {
            name: "fund",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware",
            description: "The super_fund_id of the fund",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    option: { $ref: "#/components/schemas/Option" },
                  },
                },
              },
            },
          },
          400: { description: "Missing fund parameter" },
          500: { description: "Database fetch failed" },
        },
      },
    },
    "/api/checkLifecycle": {
      get: {
        summary: "Check if a fund uses a lifecycle strategy",
        description:
          "Returns mysuper_is_lifecycle boolean for a fund matched by fund_name in the SuperFunds table.",
        parameters: [
          {
            name: "fund_name",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware Super",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    fund: {
                      type: "object",
                      properties: {
                        mysuper_is_lifecycle: { type: "boolean" },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Missing fund_name parameter" },
          500: { description: "Database fetch failed" },
        },
      },
    },
    "/api/isLifecycle": {
      get: {
        summary:
          "Check if a fund uses a lifecycle strategy (duplicate — prefer /api/checkLifecycle)",
        description:
          "Duplicate of /api/checkLifecycle. Returns mysuper_is_lifecycle for a fund matched by fund_name.",
        parameters: [
          {
            name: "fund_name",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware Super",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    fund: {
                      type: "object",
                      properties: {
                        mysuper_is_lifecycle: { type: "boolean" },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Missing fund_name parameter" },
          500: { description: "Database fetch failed" },
        },
      },
    },
    "/api/options": {
      get: {
        summary: "Get all options for a fund",
        description:
          "Returns all investment options (id, option_name, as_of_date) for a given fund. Note: missing guard for missing fund parameter.",
        parameters: [
          {
            name: "fund",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware",
            description: "The super_fund_id of the fund",
          },
        ],
        responses: {
          200: {
            description: "Success — returns raw array (not wrapped in object)",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Option" },
                },
              },
            },
          },
          500: { description: "Database fetch failed" },
        },
      },
    },
    "/api/industry_weightings": {
      get: {
        summary: "Get sector weighting across all options for a fund",
        description:
          "Returns all options for a fund with the total weighting percentage for a given sector, sorted descending by weighting.",
        parameters: [
          {
            name: "fund",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware",
          },
          {
            name: "sector",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Technology & Software",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    options: {
                      type: "array",
                      items: { $ref: "#/components/schemas/OptionWeighting" },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Missing fund or sector parameter" },
          500: { description: "Database fetch failed" },
        },
      },
    },
    "/api/company_weightings_across_options": {
      get: {
        summary: "Get a company's weighting across all options for a fund",
        description:
          "Returns all options for a fund with the weighting percentage for a specific company, sorted descending by weighting.",
        parameters: [
          {
            name: "fund",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware",
          },
          {
            name: "companyId",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "apple.com",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    options: {
                      type: "array",
                      items: { $ref: "#/components/schemas/OptionWeighting" },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Missing fund or companyId parameter" },
          500: { description: "Database fetch failed" },
        },
      },
    },
    "/api/verifyTotals": {
      get: {
        summary: "Verify total weighting percentage for a fund option",
        description:
          "Sums all Weighting_Percentage_Clean values for a fund/option combination. Note: queries by Option_Name unlike other routes which use Option_Id.",
        parameters: [
          {
            name: "fund",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Aware",
          },
          {
            name: "option",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "High Growth",
            description:
              "Option_Name (not Option_Id — differs from other routes)",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    fund: { type: "string" },
                    option: { type: "string" },
                    numberOfRowsChecked: { type: "number" },
                    totalPercentage: { type: "number" },
                  },
                },
              },
            },
          },
          400: { description: "Missing fund or option parameter" },
          404: { description: "No data found" },
          500: { description: "Database error" },
        },
      },
    },
  },
  components: {
    schemas: {
      Holding: {
        type: "object",
        properties: {
          Super_Fund: { type: "string" },
          Full_Name: { type: "string" },
          Listing_Status: { type: "string", enum: ["Listed", "Unlisted"] },
          Dollar_Value: { type: "number" },
          Weighting_Percentage_Clean: { type: "number" },
          Asset_Class: { type: "string" },
          Management_Type: { type: "string" },
          Company_Id: { type: "string" },
          Option_Id: { type: "string" },
          companies: {
            type: "object",
            properties: {
              id: { type: "string" },
              Parsed_Name: { type: "string" },
              Sector: { type: "string" },
              Description: { type: "string" },
              Country: { type: "string" },
            },
          },
          options: {
            type: "object",
            properties: {
              as_of_date: { type: "string", format: "date" },
            },
          },
        },
      },
      Option: {
        type: "object",
        properties: {
          id: { type: "string" },
          option_name: { type: "string" },
          as_of_date: { type: "string", format: "date" },
        },
      },
      OptionWeighting: {
        type: "object",
        properties: {
          id: { type: "string" },
          option_name: { type: "string" },
          as_of_date: { type: "string", format: "date" },
          Weighting_Percentage_Clean: { type: "number" },
        },
      },
    },
  },
};

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  return NextResponse.json(swaggerSpec);
}

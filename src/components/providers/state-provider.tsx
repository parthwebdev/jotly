"use client";

import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  InsertDocument,
  SelectDocument,
  SelectWorkspace,
} from "@/lib/supabase/schema";

export type Workspace = SelectWorkspace & { documents: SelectDocument[] | [] };

interface AppState {
  workspaces: Workspace[] | [];
}

type Action =
  | { type: "SET_WORKSPACES"; payload: { workspaces: Workspace[] } }
  | {
      type: "SET_DOCUMENTS";
      payload: { workspaceId: string; documents: SelectDocument[] };
    }
  | {
      type: "ADD_DOCUMENT";
      payload: {
        workspaceId: string;
        document: SelectDocument;
      };
    }
  | {
      type: "UPDATE_DOCUMENT";
      payload: {
        workspaceId: string;
        documentId: string;
        document: Partial<InsertDocument>;
      };
    }
  | {
      type: "DELETE_DOCUMENT";
      payload: {
        workspaceId: string;
        documentId: string;
      };
    };

const initialState: AppState = {
  workspaces: [],
};

const appReducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case "SET_WORKSPACES":
      return {
        ...state,
        workspaces: action.payload.workspaces,
      };

    case "SET_DOCUMENTS":
      return {
        ...state,
        workspaces: state.workspaces.map((workspace) => {
          if (workspace.id === action.payload.workspaceId) {
            return {
              ...workspace,
              documents: [...action.payload.documents],
            };
          }
          return workspace;
        }),
      };

    case "ADD_DOCUMENT":
      return {
        ...state,
        workspaces: state.workspaces.map((workspace) => {
          if (workspace.id === action.payload.workspaceId) {
            return {
              ...workspace,
              documents: [...workspace.documents, action.payload.document],
            };
          }
          return workspace;
        }),
      };

    case "UPDATE_DOCUMENT":
      return {
        ...state,
        workspaces: state.workspaces.map((workspace) => {
          if (workspace.id === action.payload.workspaceId) {
            return {
              ...workspace,
              documents: workspace.documents.map((document) => {
                if (document.id === action.payload.documentId) {
                  return {
                    ...document,
                    ...action.payload.document,
                  };
                }
                return document;
              }),
            };
          }
          return workspace;
        }),
      };

    case "DELETE_DOCUMENT":
      return {
        ...state,
        workspaces: state.workspaces.map((workspace) => {
          if (workspace.id === action.payload.workspaceId) {
            return {
              ...workspace,
              documents: workspace.documents.filter(
                (doc) => doc.id !== action.payload.documentId
              ),
            };
          }

          return workspace;
        }),
      };

    default:
      return initialState;
  }
};

const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    console.log("🟢 State Changed: ", state);
  }, [state]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default StateProvider;

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }

  return context;
};

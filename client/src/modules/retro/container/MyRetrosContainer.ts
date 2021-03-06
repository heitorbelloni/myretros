import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { MyRetros, MyRetrosProps } from "../components";
import { withRouter } from "react-router-dom";

const mapStateToProps = (
  state: ApplicationState): Partial<MyRetrosProps> => {
  return {
    isLoading: state.appState.isLoading,
  };
};

export const MyRetrosContainer = withRouter(
  connect(mapStateToProps)(MyRetros)
);
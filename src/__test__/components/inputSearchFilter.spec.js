import React from "react";
//import {mount} from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import InputSearchFilter from "../../components/inputSearchFilter";
//import initialState from '../../reducers/initialState';
//import repoMock from "../data/mock";

describe("InputSearchFilter", () => {
  it('InputSearchFilter component renders correctly', () => {
      const props = {
          search: jest.fn(),
      };
      const rendered = renderer.create(
          <MemoryRouter>
              <InputSearchFilter {...props} />
          </MemoryRouter>
      );
      expect(rendered.toJSON()).toMatchSnapshot();
  });
});
  
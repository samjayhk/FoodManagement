import React from 'react';
import PropTypes from 'prop-types';
const relayMock = jest.genMockFromModule('react-relay');

const relayChildContextTypes = {
    relay: PropTypes.object
};

const relayEnvironment = {
    lookup: jest.fn()
};

const relayContext = {
    relay: {
        environment: relayEnvironment,
        variables: {}
    }
};

const relayFragmentProps = {
    relay: {
        environment: relayEnvironment
    }
};

const relayRefetchProps = {
    relay: {
        environment: relayEnvironment,
        refetch: jest.fn()
    }
};

const relayPaginationProps = {
    relay: {
        environment: relayEnvironment,
        hasMore: jest.fn(),
        loadMore: jest.fn(),
        isLoading: jest.fn()
    }
};

relayMock.__relayEnvironment = relayEnvironment;
relayMock.__relayFragmentProps = relayFragmentProps;
relayMock.__relayRefetchProps = relayRefetchProps;
relayMock.__relayPaginationProps = relayPaginationProps;

function makeRelayWrapper(relayProps) {
    return function (Comp) {
        class HOC extends React.Component {
            getChildContext() {
                return relayContext;
            }

            render() {
                return <Comp {...this.props} {...relayProps}/>;
            }
        }

        HOC.childContextTypes = relayChildContextTypes;
        return HOC;
    };
}

relayMock.QueryRenderer = jest.fn(() => React.createElement('div', null, 'Test'));

relayMock.createFragmentContainer = makeRelayWrapper(relayFragmentProps);
relayMock.createRefetchContainer = makeRelayWrapper(relayRefetchProps);
relayMock.createPaginationContainer = makeRelayWrapper(relayPaginationProps);

module.exports = relayMock;
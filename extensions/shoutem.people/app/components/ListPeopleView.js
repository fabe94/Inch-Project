import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import {
  Image,
  Subtitle,
  Row,
  View,
  Caption,
  Divider,
  TouchableOpacity,
} from '@shoutem/ui';

export default class ListPeopleView extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    person: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.person);
  }

  render() {
    const { person } = this.props;

    return (
      <TouchableOpacity key={person.id} onPress={this.onPress}>
        <View>
          <Row>
            <Image
              source={{ uri: person.image ? person.image.url : undefined }}
              styleName="small rounded-corners placeholder"
            />
            <View styleName="vertical stretch space-between">
              <Subtitle>{person.firstName} {person.lastName}</Subtitle>
              <Caption>{person.profession}</Caption>
            </View>
          </Row>
          <Divider styleName="line" />
        </View>
      </TouchableOpacity>
    );
  }
}

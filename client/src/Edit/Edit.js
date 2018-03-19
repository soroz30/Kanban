import React, { Component } from 'react';
import styles from './Edit.css';

class Edit extends Component {
    checkEnter = (e) => {
        if (e.key === 'Enter') {
            this.finishEdit(e);
        }
    }

    finishEdit = (e) => {
        const value = e.target.value;

        if (this.props.onUpdate) {
            this.props.onUpdate(value.trim());
        }
    }

    renderDelete = () => {
        return <button className={styles.delete} onClick={this.props.onDelete}>X</button>;
    }

    renderValue = () => {
        const { value, onDelete, onValueClick } = this.props;

        return (
            <div>
                <span className={styles.value} onClick={onValueClick}>{value}</span>
                    {onDelete ? this.renderDelete() : null}
            </div>
        );
    }

    renderEdit = () => {
        return (
            <input
                className={styles.input}
                type='text'
                autoFocus
                defaultValue={this.props.value}
                onBlur={this.finishEdit}
                onKeyPress={this.checkEnter}
            />
        );
    }

    render = () => {
        return (
            <div className={styles.Edit}>
                {this.props.editing ? this.renderEdit() : this.renderValue()}
            </div>
        );
    }
}

export default Edit;
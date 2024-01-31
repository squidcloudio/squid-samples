# Frontend for the Squid Names game

This is an implementation of the Codenames board game written using React, TypeScript, and Vite.

To learn how to run the project, view the [README](../README.md) in the `squidnames` folder.

It represents a fully-functional example of making a game using Squid Cloud as the backend. Check out the [backend folder's README](../backend/README.md) to learn more about the Squid architecture.

## Overview

Squid Names is designed to allow anyone to drop in and play without signing in to an account. Players enter a unique name and choose whether they want to join the Red or Blue team.

A step is added to confirm a guess. This means players can click on a card to tentatively select it and other players
can see which cards are selected. This should help the team to visually keep track of which cards might be suitable
guesses and aid in their discussions.

## Design

A `GameState` object is stored into Squid's [built-in database](https://docs.squid.cloud/docs/integrations/database/built-in) and contains all information pertaining to an active
game. To address race conditions when updating the game state, we use Squid's `acquirelock()` mechanism to lock the
reading and modification of the game state.
